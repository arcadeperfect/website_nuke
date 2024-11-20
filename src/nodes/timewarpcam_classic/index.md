---
layout: base
title: Timewarp Cam (classic)- Camera Timewarping
---

# Timewarp Cam (Classic)

[Github](https://github.com/arcadeperfect/nuke_harding_nodes/blob/main/groups/timewarpcam_classic.nk)



Tool for timewarping or timeoffsetting a camera.

Plug a camera into the input, and animate the Timewarp knob.

Can be stacked. 

It can be used as a camera directly, or you can use the button to generate an expression linked one.

*For classic cameras (Camera3) only*{.info}



{% raw %}
```python
# THIS SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
set cut_paste_input [stack 0]
version 15.0 v4
push $cut_paste_input
Group {
 name Cam_timewarp_Classic2
 selected true
 xpos -206
 ypos 1043
 addUserKnob {20 Controls}
 addUserKnob {7 Timewarp R 0 100}
 Timewarp 1
 addUserKnob {7 Offset R 0 100}
 addUserKnob {26 space l "" +STARTLINE T "  "}
 addUserKnob {22 generate_cam l "Generate Timewarped Cam" T "this_node = nuke.thisNode()\n\nnuke.thisGroup().parent().begin()\n\n\nattrs = \[\"translate\", \n        \"rotate\",\n        \"scaling\",\n        \"uniform_scale\",\n        \"skew\",\n        \"pivot_translate\",\n        \"pivot_rotate\",\n        \"focal\",\n        \"haperture\",\n        \"vaperture\",\n        \"near\",\n        \"far\",\n        \"win_translate\",\n        \"win_scale\",\n        \"winroll\",\n        \"focal_point\",\n        \"fstop\",\n        \"shutter\"]\n\ndef link_cam(cam1, cam2, attrs):\n\n    for attr in attrs:\n        cam2\[attr].setExpression(f\"\{cam1.name()\}.\{attr\}\")\n\nnew_cam = nuke.createNode(\"Camera3\", \"label lerpCam\")\nnew_cam.setInput(0, None)\nnew_cam.setInput(1, None)\n\nlink_cam(this_node, new_cam, attrs)" +STARTLINE}
 addUserKnob {26 "" +STARTLINE}
 addUserKnob {26 instructions l "" +STARTLINE T "Connect a camera to the input and adjust the knobs.\n\nThis node can be used as a camera or you can use the button to generate an expression linked one. "}
 addUserKnob {20 camera_tab l Camera}
 addUserKnob {41 display l Display T Camera1.display}
 addUserKnob {41 selectable l Selectable T Camera1.selectable}
 addUserKnob {41 transform T Camera1.transform}
 addUserKnob {41 file_menu l @FolderIcon T Camera1.file_menu}
 addUserKnob {41 snap_menu l @AxisIcon T Camera1.snap_menu}
 addUserKnob {41 xform_order l "Transform Order" T Camera1.xform_order}
 addUserKnob {41 rot_order l "Rotation Order" T Camera1.rot_order}
 addUserKnob {41 translate l Translate T Camera1.translate}
 addUserKnob {41 rotate l Rotate T Camera1.rotate}
 addUserKnob {41 scaling l Scale T Camera1.scaling}
 addUserKnob {41 uniform_scale l "Uniform Scale" T Camera1.uniform_scale}
 addUserKnob {41 skew l Skew T Camera1.skew}
 addUserKnob {41 pivot_translate l "Pivot Translate" T Camera1.pivot_translate}
 addUserKnob {41 pivot_rotate l "Pivot Rotate" T Camera1.pivot_rotate}
 addUserKnob {20 "" l "Local Matrix" n 2}
 addUserKnob {41 useMatrix l "Specify Matrix" T Camera1.useMatrix}
 addUserKnob {41 matrix l "" -STARTLINE T Camera1.matrix}
 addUserKnob {20 "" n -1}
 addUserKnob {20 "" l "World matrix" n 2}
 addUserKnob {41 world_matrix l "" -STARTLINE T Camera1.world_matrix}
 addUserKnob {20 "" n -1}
 addUserKnob {20 projection_tab l Projection}
 addUserKnob {41 projection_mode l Projection T Camera1.projection_mode}
 addUserKnob {26 ""}
 addUserKnob {41 world_to_meters l "World to Meters" T Camera1.world_to_meters}
 addUserKnob {41 focal l "Focal Length" T Camera1.focal}
 addUserKnob {41 haperture l "Horizontal Aperture" T Camera1.haperture}
 addUserKnob {41 vaperture l "Vertical Aperture" T Camera1.vaperture}
 addUserKnob {41 near l Near T Camera1.near}
 addUserKnob {41 far l Far T Camera1.far}
 addUserKnob {41 win_translate l "Window Translate" T Camera1.win_translate}
 addUserKnob {41 win_scale l "Window Scale" T Camera1.win_scale}
 addUserKnob {41 winroll l "Window Roll" T Camera1.winroll}
 addUserKnob {41 focal_point l "Focal Distance" T Camera1.focal_point}
 addUserKnob {41 fstop l Fstop T Camera1.fstop}
 addUserKnob {41 shutter l Shutter T Camera1.shutter}
 addUserKnob {41 shutteroffset l "Shutter Offset" T Camera1.shutteroffset}
 addUserKnob {41 shuttercustomoffset l "" -STARTLINE T Camera1.shuttercustomoffset}
 addUserKnob {41 shutter_bias l Bias T Camera1.shutter_bias}
 addUserKnob {20 Info}
 addUserKnob {26 version l "" +STARTLINE T "Timewarp Cam v0.1\n\n\nnuke.alexharding.ooo/timewarpcam_classic"}
}
 Output {
  inputs 0
  name Output1
  xpos 56
  ypos 374
 }
 Input {
  inputs 0
  name Cam_1
  xpos -20
  ypos 15
  addUserKnob {20 User}
  addUserKnob {13 t}
  t {{input.translate} {input.translate} {input.translate}}
  addUserKnob {13 r}
  r {{input.rotate} {input.rotate} {input.rotate}}
  addUserKnob {13 s}
  s {{input.scaling} {input.scaling} {input.scaling}}
  addUserKnob {7 focal}
  focal {{input.focal}}
  addUserKnob {7 hap}
  hap {{input.haperture}}
  addUserKnob {7 vap}
  vap {{input.vaperture}}
  addUserKnob {7 near}
  near {{input.near}}
  addUserKnob {7 far}
  far {{input.far}}
 }
 Camera3 {
  inputs 0
  translate {{input0.translate(rtm) x1495 0} {input0.translate(rtm) x1495 0} {input0.translate(rtm) x1495 -3.971999884}}
  rotate {{input0.rotate(rtm)} {input0.rotate(rtm)} {input0.rotate(rtm)}}
  scaling {{input0.scaling(rtm)} {input0.scaling(rtm)} {input0.scaling(rtm)}}
  uniform_scale {{input0.uniform_scale(rtm)}}
  skew {{input0.skew(rtm)} {input0.skew(rtm)} {input0.skew(rtm)}}
  pivot_translate {{input0.pivot_translate(rtm)} {input0.pivot_translate(rtm)} {input0.pivot_translate(rtm)}}
  pivot_rotate {{input0.pivot_rotate(rtm)} {input0.pivot_rotate(rtm)} {input0.pivot_rotate(rtm)}}
  focal {{input0.focal(rtm)}}
  haperture {{input0.haperture(rtm)}}
  vaperture {{input0.vaperture(rtm)}}
  near {{input0.near(rtm)}}
  far {{input0.far(rtm)}}
  win_translate {{input0.win_translate(rtm)} {input0.win_translate(rtm)}}
  win_scale {{input0.win_scale(rtm)} {input0.win_scale(rtm)}}
  winroll {{input0.winroll(rtm)}}
  focal_point {{input0.focal_point(rtm)}}
  fstop {{input0.shutter(rtm)}}
  shutter {{input0.shutter(rtm)}}
  name Camera1
  selected true
  xpos -12
  ypos 128
  addUserKnob {20 User}
  addUserKnob {7 ofst}
  ofst {{parent.Offset}}
  addUserKnob {7 rtm}
  rtm {{parent.Timewarp+ofst x1 1 x50 100 x100 1}}
 }
end_group

```
{% endraw %}