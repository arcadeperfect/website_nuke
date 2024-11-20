---
layout: base
title: LerpCam (classic)- Camera Interpolation
---

# Temporal Stabilizer (Classic)

[Github](https://github.com/arcadeperfect/nuke_harding_python/blob/main/src/nuke_harding_python/scripts/temporal_stab_classic.py)

A script that normalizes the velocity of the motion of a camera.

It generates two timewarp nodes, one to remove variation in velocity, and one to reapply it.

They can be applied to the camera, or the footage if it was tracked.

This can be useful for transition shots where you want to blend between two cameras seamlessly (see [LerpCam]({{ '/nodes/lerpcam_classic' | url }})). Often the speed of the camera move will slow or be irregular during the regions you want to blend, since it is usually at the end of the move.

Use this script to normalize the velocity, do the stitch, and selectively reintroduce the velocity curves to the stitched camera as desired.

Or it can be useful to just smooth out a move for a more hyperlapse look.


*For classic cameras (Camera3) only*{.info}

## Usage
```python
cam = nuke.selectedNode() # store the selected camera in a variable

temporal_stabilize(cam) # run the script on that camera

```

## Code

{% raw %}
```python
"""
MIT License - see https://opensource.org/licenses/MIT
Copyright (c) [2024] [alex harding] alexharding.ooo
Permission is granted to use, copy, modify, and distribute this software and its documentation, provided that all copies include the copyright notice and this permission notice.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.

Temporal Stabilizer Classic v0.1
Analyzes a camera's velocity and generates two timewarp nodes.
The first removes variation in velocity.
The second reapplies it.
They can be applied to both the camera and it's associated footage if it was tracked.
"""

import math
import nuke


class Vec3:
    def __init__(self, x=0, y=0, z=0):
        self.x = x
        self.y = y
        self.z = z

    @staticmethod
    def get_distance(a, b):
        dx = b.x - a.x
        dy = b.y - a.y
        dz = b.z - a.z
        return math.sqrt(dx**2 + dy**2 + dz**2)


def temporal_stabilize(cam):
    translate_knob = cam["translate"]

    t_x = translate_knob.animation(0)
    t_y = translate_knob.animation(1)
    t_z = translate_knob.animation(2)

    first = int(t_x.keys()[0].x)
    last = int(t_x.keys()[-1].x)

    positions = []
    times = []
    distances = [0]
    total_distance = 0

    previous_p = Vec3(t_x.evaluate(first), t_y.evaluate(first), t_z.evaluate(first))
    positions.append(previous_p)
    times.append(first)

    for frame in range(first + 1, last + 1):
        this_p = Vec3(t_x.evaluate(frame), t_y.evaluate(frame), t_z.evaluate(frame))
        d = Vec3.get_distance(previous_p, this_p)
        total_distance += d
        distances.append(total_distance)
        positions.append(this_p)
        times.append(frame)
        previous_p = this_p

    # Calculate the average velocity
    average_velocity = total_distance / (last - first)

    # Create new time array where time change is inversely proportional to velocity
    new_times = [first]
    for i in range(1, len(times)):
        segment_distance = distances[i] - distances[i - 1]
        segment_time = times[i] - times[i - 1]
        segment_velocity = (
            segment_distance / segment_time if segment_time != 0 else average_velocity
        )
        time_factor = segment_velocity / average_velocity
        new_segment_time = segment_time * time_factor
        new_times.append(new_times[-1] + new_segment_time)

    # Normalize new_times to fit within the original frame range
    new_times = [
        first + (t - first) * (last - first) / (new_times[-1] - first) for t in new_times
    ]


    # Create lookup table
    flatten = nuke.createNode("TimeWarp")
    flatten["label"].setValue("flatten")

    for original_time, new_time in zip(times, new_times):
        l = flatten["lookup"]
        l.setAnimated()
        flatten["lookup"].setValueAt(original_time, new_time)

    apply = nuke.createNode("TimeWarp")
    apply["label"].setValue("apply")

    for original_time, new_time in zip(times, new_times):
        l = apply["lookup"]
        l.setAnimated()
        apply["lookup"].setValueAt(new_time, original_time)


```
{% endraw %}