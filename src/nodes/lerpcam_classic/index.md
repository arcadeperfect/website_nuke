---
layout: base
title: Lerp Cam (classic)- Camera Interpolation
---

# LerpCam (Classic)

[Github](https://github.com/arcadeperfect/nuke_harding_nodes/blob/main/groups/lerpcam_classic.nk)
<!-- https://github.com/arcadeperfect/nuke_harding_nodes/blob/main/groups/lerpcam_classic.nk -->


Tool for interpolating between two cameras.

Plug a camera into each input, and animate the Lerp knob.

Can be stacked.

It can be used as a camera directly, or you can use the button to generate an expression linked one.

*For classic cameras (Camera3) only*{.info}



{% raw %}
```python
# THIS SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.

set cut_paste_input [stack 0]
version 15.0 v4
push 0
push $cut_paste_input
Group {
inputs 2
name LerpCam
selected true
xpos -642
ypos 215
addUserKnob {20 Controls}
addUserKnob {41 lrp l Lerp T lerp_cam.lrp}
addUserKnob {26 space l "" +STARTLINE T " "}
addUserKnob {22 generate_lerp_cam l "Generate Lerp Cam" t "creates a camera with all values lerped between the two input cameras\n" T "this_node = nuke.thisNode()\n\nnuke.thisGroup().parent().begin()\n\n\nattrs = \[\"translate\", \n        \"rotate\",\n        \"scaling\",\n        \"uniform_scale\",\n        \"skew\",\n        \"pivot_translate\",\n        \"pivot_rotate\",\n        \"focal\",\n        \"haperture\",\n        \"vaperture\",\n        \"near\",\n        \"far\",\n        \"win_translate\",\n        \"win_scale\",\n        \"winroll\",\n        \"focal_point\",\n        \"fstop\",\n        \"shutter\"]\n\ndef link_cam(cam1, cam2, attrs):\n\n    for attr in attrs:\n        cam2\[attr].setExpression(f\"\{cam1.name()\}.\{attr\}\")\n\nlerp_cam = nuke.createNode(\"Camera3\", \"label lerpCam\")\nlerp_cam.setInput(0, None)\nlerp_cam.setInput(1, None)\n\nlink_cam(this_node, lerp_cam, attrs)\n\n    " +STARTLINE}
addUserKnob {26 divider1 l "" +STARTLINE}
addUserKnob {26 Instructions l "" +STARTLINE T "Connect a camera to each input and lerp between them.\n\nThis node can be used as a camera or you can use the button to generate an expression linked one"}
addUserKnob {20 Camera}
addUserKnob {41 display l Display T lerp_cam.display}
addUserKnob {41 selectable l Selectable T lerp_cam.selectable}
addUserKnob {41 transform T lerp_cam.transform}
addUserKnob {41 file_menu l @FolderIcon T lerp_cam.file_menu}
addUserKnob {41 snap_menu l @AxisIcon T lerp_cam.snap_menu}
addUserKnob {41 xform_order l "Transform Order" T lerp_cam.xform_order}
addUserKnob {41 rot_order l "Rotation Order" T lerp_cam.rot_order}
addUserKnob {41 translate l Translate T lerp_cam.translate}
addUserKnob {41 rotate l Rotate T lerp_cam.rotate}
addUserKnob {41 scaling l Scale T lerp_cam.scaling}
addUserKnob {41 uniform_scale l "Uniform Scale" T lerp_cam.uniform_scale}
addUserKnob {41 skew l Skew T lerp_cam.skew}
addUserKnob {41 pivot_translate l "Pivot Translate" T lerp_cam.pivot_translate}
addUserKnob {41 pivot_rotate l "Pivot Rotate" T lerp_cam.pivot_rotate}
addUserKnob {20 "" l "Local Matrix" n 2}
addUserKnob {41 useMatrix l "Specify Matrix" T lerp_cam.useMatrix}
addUserKnob {41 matrix l "" -STARTLINE T lerp_cam.matrix}
addUserKnob {20 Projection}
addUserKnob {41 projection_mode l Projection T lerp_cam.projection_mode}
addUserKnob {26 ""}
addUserKnob {41 world_to_meters l "World to Meters" T lerp_cam.world_to_meters}
addUserKnob {41 focal l "Focal Length" T lerp_cam.focal}
addUserKnob {41 haperture l "Horizontal Aperture" T lerp_cam.haperture}
addUserKnob {41 vaperture l "Vertical Aperture" T lerp_cam.vaperture}
addUserKnob {41 near l Near T lerp_cam.near}
addUserKnob {41 far l Far T lerp_cam.far}
addUserKnob {41 win_translate l "Window Translate" T lerp_cam.win_translate}
addUserKnob {41 win_scale l "Window Scale" T lerp_cam.win_scale}
addUserKnob {41 winroll l "Window Roll" T lerp_cam.winroll}
addUserKnob {41 focal_point l "Focal Distance" T lerp_cam.focal_point}
addUserKnob {41 fstop l Fstop T lerp_cam.fstop}
addUserKnob {41 shutter l Shutter T lerp_cam.shutter}
addUserKnob {41 shutteroffset l "Shutter Offset" T lerp_cam.shutteroffset}
addUserKnob {41 shuttercustomoffset l "" -STARTLINE T lerp_cam.shuttercustomoffset}
addUserKnob {41 shutter_bias l Bias T lerp_cam.shutter_bias}
addUserKnob {20 "" l "World matrix" n 2}
addUserKnob {41 world_matrix l "" -STARTLINE T lerp_cam.world_matrix}
addUserKnob {20 Info}
addUserKnob {26 version l "" +STARTLINE T "Lerp Cam v0.1\n\nnuke.alexharding.ooo/nodes/lerpcam_classic"}
}
NoOp {
inputs 0
name NoOp1
xpos 281
ypos 77
addUserKnob {20 User}
addUserKnob {13 translate}
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
Input {
inputs 0
name Cam_2
xpos 102
ypos 15
number 1
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
translate {{"lerp(input0.translate, input1.translate, lrp)" x1 70.9417038} {"lerp(input0.translate, input1.translate, lrp)" x1 -146.4225159} {"lerp(input0.translate, input1.translate, lrp)" x1 56.61929703}}
rotate {{"lerp(input0.rotate, input1.rotate, lrp)" x1 -59.89097977} {"lerp(input0.rotate, input1.rotate, lrp)" x1 -53.29590607} {"lerp(input0.rotate, input1.rotate, lrp)" x1 56.45447159}}
scaling {{"lerp(input0.scaling, input1.scaling, lrp)"} {"lerp(input0.scaling, input1.scaling, lrp)"} {"lerp(input0.scaling, input1.scaling, lrp)"}}
uniform_scale {{"lerp(input0.uniform_scale, input1.uniform_scale, lrp)"}}
skew {{"lerp(input0.skew, input1.skew, lrp)"} {"lerp(input0.skew, input1.skew, lrp)"} {"lerp(input0.skew, input1.skew, lrp)"}}
pivot_translate {{lerp(input0.pivot_translate,input1.pivot_translate,lrp) x1 0} {lerp(input0.pivot_translate,input1.pivot_translate,lrp) x1 0} {lerp(input0.pivot_translate,input1.pivot_translate,lrp) x1 0}}
pivot_rotate {{lerp(input0.pivot_rotate,input1.pivot_rotate,lrp) x1 1.212044026e-06} {lerp(input0.pivot_rotate,input1.pivot_rotate,lrp) x1 -1.787765359e-05} {lerp(input0.pivot_rotate,input1.pivot_rotate,lrp) x1 -176.2310181}}
focal {{lerp(input0.focal,input1.focal,lrp)}}
haperture {{lerp(input0.haperture,input1.haperture,lrp)}}
vaperture {{"lerp(input0.vaperture, input1.vaperture, lrp)"}}
near {{"lerp(input0.near, input1.near, lrp)"}}
far {{"lerp(input0.far, input1.far, lrp)"}}
win_translate {{"lerp(input0.win_translate, input1.win_translate, lrp)"} {"lerp(input0.win_translate, input1.win_translate, lrp)"}}
win_scale {{"lerp(input0.win_scale, input1.win_scale, lrp)"} {"lerp(input0.win_scale, input1.win_scale, lrp)"}}
winroll {{"lerp(input0.winroll, input1.winroll, lrp)"}}
focal_point {{lerp(input0.focal_point,input1.focal_point,lrp)}}
fstop {{"lerp(input0.fstop, input1.fstop, lrp)"}}
shutter {{"lerp(input0.shutter, input1.shutter, lrp)"}}
name lerp_cam
selected true
xpos 38
ypos 143
addUserKnob {20 User}
addUserKnob {7 lrp}
}
Output {
name Output1
xpos 56
ypos 374
}
end_group
```
{% endraw %}