---
layout: base
title: Timewarp Cam (classic)- Camera Timewarping
---

# Fancy Grad

[Github](https://github.com/arcadeperfect/nuke_harding_nodes/blob/main/groups/fancygrad.nk)



For creating patches.

Creates a dynamic gradient from the edges of the corner pin.

Either sample the corners, the corners and the center of each edge, or each pixel along each edge.



{% raw %}
```python
# THIS SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
set cut_paste_input [stack 0]
version 15.0 v4
push $cut_paste_input
Group {
 name FancyGrad
 selected true
 xpos -225
 ypos 88
 addUserKnob {20 User}
 addUserKnob {41 premult T ctrl.premult}
 addUserKnob {41 samples T ctrl.samples}
 addUserKnob {41 off l "sample size" T ctrl.off}
 addUserKnob {41 size_1 l "blur alpha" T BlurAlpha.size}
 addUserKnob {41 size l "blur input" T BlurInput.size}
 addUserKnob {41 size_2 l "blur patch" T BlurPatch.size}
 addUserKnob {41 falloff T ctrl.falloff}
 addUserKnob {26 ""}
 addUserKnob {41 from1 T CP_out.from1}
 addUserKnob {41 from2 T CP_out.from2}
 addUserKnob {41 from3 T CP_out.from3}
 addUserKnob {41 from4 T CP_out.from4}
 addUserKnob {20 loads l "loads-of-samples settings"}
 addUserKnob {41 size_3 l "iBlur patch" T iblur_patch.size}
 addUserKnob {7 mmult l "iBlur Blend Matte" R 0 2}
 mmult 1
 addUserKnob {26 line1 l "" +STARTLINE}
 addUserKnob {26 blendMatteGrade l "" +STARTLINE T "grade blend matte"}
 addUserKnob {41 add l offset T grade_matte.add}
 addUserKnob {41 gamma T grade_matte.gamma}
 addUserKnob {41 white l gain T grade_matte.white}
 addUserKnob {26 ""}
 addUserKnob {26 gradeBlurMatte l "" +STARTLINE T "grade blur matte"}
 addUserKnob {41 add_1 l offset T grade_blur_matte.add}
 addUserKnob {41 gamma_1 l gamma T grade_blur_matte.gamma}
 addUserKnob {41 white_1 l gain T grade_blur_matte.white}
 addUserKnob {20 Info}
 addUserKnob {26 _1 l "" +STARTLINE T "Fancy Grad v0.1\n\nnuke.alexharding.ooo/nodes/fancygrad\n"}
}
 BackdropNode {
  inputs 0
  name BackdropNode1
  tile_color 0xc0c0c001
  label important
  note_font_size 42
  xpos -2034
  ypos 109
  bdwidth 1123
  bdheight 396
 }
 Input {
  inputs 0
  name Input1
  xpos -1190
  ypos 44
 }
 NoOp {
  name NoOp1
  xpos -1190
  ypos 106
  addUserKnob {20 User}
  addUserKnob {7 test}
 }
set Nb684ac00 [stack 0]
 Dot {
  name Dot1
  xpos -1156
  ypos 210
 }
set Nb6841c00 [stack 0]
 NoOp {
  name FormatReceiver
  xpos -1311
  ypos 351
 }
push $Nb684ac00
 Shuffle {
  red black
  green black
  blue black
  alpha black
  name Shuffle1
  xpos -1035
  ypos 253
 }
 CornerPin2D {
  to1 {0 0}
  to2 {{width} 0}
  to3 {{width x1 1930 1956} {height x1 956 1032}}
  to4 {0 {height}}
  invert true
  shutter 1.45
  from1 {{CP_out.from1.x} {CP_out.from1.y}}
  from2 {{CP_out.from2.x x1 1616} {CP_out.from2.y x1 312}}
  from3 {{CP_out.from3.x x1 1588} {CP_out.from3.y x1 1052}}
  from4 {{CP_out.from4.x} {CP_out.from4.y}}
  name ___MainCP_A2
  xpos -1035
  ypos 279
 }
 Reformat {
  inputs 0
  type "to box"
  box_width {{FormatReceiver.width}}
  box_height {{FormatReceiver.height}}
  box_fixed true
  box_pixel_aspect {{FormatReceiver.pixel_aspect}}
  resize distort
  name Reformat23
  xpos 432
  ypos 2291
 }
 Expression {
  expr3 x/width<=y/height&&x/width>=1-(y/height)||x/width>=y/height&&x/width<=1-(y/height)?y/height<0.5?y/height*2:(1-(y/height))*2:x/width<0.5?x/width*2:(1-(x/width))*2
  name Expression23
  xpos 432
  ypos 2317
 }
 Dot {
  name Dot6
  xpos 466
  ypos 2383
 }
set N3005fa00 [stack 0]
 Dot {
  name Dot8
  xpos 466
  ypos 2496
 }
 Grade {
  channels alpha
  black_clamp false
  name grade_blur_matte
  xpos 145
  ypos 2489
 }
push $N3005fa00
 Reformat {
  inputs 0
  type "to box"
  box_width {{FormatReceiver.width}}
  box_height {{FormatReceiver.height}}
  box_fixed true
  box_pixel_aspect {{FormatReceiver.pixel_aspect}}
  resize distort
  name Reformat22
  xpos 500
  ypos 1928
 }
 Expression {
  expr3 x/width<y/height?0:1
  name Expression18
  xpos 500
  ypos 1954
 }
set N30c58000 [stack 0]
push $N30c58000
 Mirror2 {
  flop true
  name Mirror2_1
  xpos 599
  ypos 1988
 }
 Merge2 {
  inputs 2
  operation multiply
  name Merge1
  xpos 500
  ypos 2028
 }
set N30d44600 [stack 0]
 Mirror2 {
  flip true
  name Mirror2_2
  xpos 362
  ypos 2085
 }
push $N30d44600
 Merge2 {
  inputs 2
  operation screen
  name Scrn
  xpos 500
  ypos 2085
 }
 Dot {
  name Dot5
  xpos 312
  ypos 2231
 }
 Group {
  inputs 2
  name iblur_matte
  selected true
  xpos 278
  ypos 2380
  addUserKnob {20 User}
  addUserKnob {41 size T MasterBlur.size}
  addUserKnob {4 defocus l "What you want?" M {Blur Defocus ""}}
 }
  Input {
   inputs 0
   name Matte
   xpos 1016
   ypos -551
   number 1
  }
  Shuffle {
   red alpha
   green alpha
   blue alpha
   name Shuffle1
   xpos 1016
   ypos -525
  }
  Roto {
   cliptype none
   curves {{{v x3f99999a}
  {f 0}
  {n
   {layer Root
    {f 512}
    {t x44b40000 x44070000}
    {a}
    {curvegroup Bezier1 576 bezier
     {{cc
       {f 8192}
       {px x44852000
        {x3e752008 xbffe2824}
        {x43b70000 x435a0000}
        {xbe754003 x3ffe2920}
        {x3f838c00 x4102e925}
        {x44538000 x439c0000}
        {xbf838c00 xc102e91a}
        {x405b07f2 xc13ac986}
        {x44520000 x439b0000}
        {xc05b07f2 x413ac986}
        {xc135d70a x412b758e}
        {x43b60000 x43580000}
        {x4135d639 xc12b7660}}}
      {cc
       {f 8192}
       {px x44852000
        {x3e752008 xbffe2824}
        {0 0}
        {xbe754003 x3ffe2920}
        {x3f838c00 x4102e925}
        {0 0}
        {xbf838c00 xc102e91a}
        {x405b0a13 xc13ac91d}
        {x42480000 x44150000}
        {xc05b07f2 x413aca58}
        {xc135d639 x412b75f7}
        {xc2900000 x44280000}
        {x4135d639 xc12b758e}}}}
     {t
      {{x44852000 x44500000}}
      {{x44852000 x44194000}}     0
      {{x44852000 0}}
      {{x44852000 0}}     0 0 0
      {{x44852000 0}}
      {{x44852000 1}}
      {{x44852000 1}}     1
      {{x44852000 0}}}
     {a spx x44b40000 spy x44070000 sb 1 ltn x44852000 ltm x44852000 tt x40800000}}}}}}
   toolbox {selectAll {
  { selectAll str 1 ssx 1 ssy 1 sf 1 }
  { createBezier str 1 ssx 1 ssy 1 sf 1 sb 1 tt 4 }
  { createBezierCusped str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { createBSpline str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { createEllipse str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { createRectangle str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { createRectangleCusped str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { brush str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { eraser src 2 str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { clone src 1 str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { reveal src 3 str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { dodge src 1 str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { burn src 1 str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { blur src 1 str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { sharpen src 1 str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { smear src 1 str 1 ssx 1 ssy 1 sf 1 sb 1 }
} }
   toolbar_brush_hardness 0.200000003
   toolbar_source_transform_scale {1 1}
   toolbar_source_transform_center {320 240}
   colorOverlay 0
   lifetime_type "all frames"
   lifetime_start 1065
   lifetime_end 1065
   motionblur_shutter_offset_type centred
   source_translate_round false
   source_black_outside true
   name Roto36
   xpos 1016
   ypos -499
   disable true
  }
set N30dbca00 [stack 0]
  Grade {
   blackpoint {{lower i}}
   whitepoint {{upper i}}
   name Grade66
   xpos 2820
   ypos 68
   addUserKnob {20 User}
   addUserKnob {7 upper}
   upper {{divide*num i}}
   addUserKnob {7 lower}
   lower {{upper-divide i}}
   addUserKnob {7 total}
   total {{parent.MasterBlur.numControl i}}
   addUserKnob {7 center}
   addUserKnob {7 divide}
   divide {{1/total i x1065 inf}}
   addUserKnob {7 num}
   num 10
  }
  Shuffle {
   alpha red
   name Shuffle23
   xpos 2820
   ypos 94
  }
  Input {
   inputs 0
   name Image
   xpos 906
   ypos -551
  }
  Roto {
   cliptype none
   curves {{{v x3f99999a}
  {f 0}
  {n
   {layer Root
    {f 512}
    {t x44b40000 x44070000}
    {a}
    {curvegroup Rectangle1 512 bezier
     {{cc
       {f 8192}
       {px x44852000
        {0 xc3b95560}
        {x43ef0000 x44898000}
        {x40c00000 0}
        {xc0c00000 0}
        {x43f80000 x44898000}
        {0 xc3b95560}
        {0 x43b95560}
        {x43f80000 xc1400000}
        {xc0c00000 0}
        {x40c00000 0}
        {x43ef0000 xc1400000}
        {0 x43b95560}}}     idem}
     {t
      {{x44852000 x43f38000}}
      {{x44852000 x44080000}}     0
      {{x44852000 0}}
      {{x44852000 0}}     0 0 0
      {{x44852000 0}}
      {{x44852000 1}}
      {{x44852000 1}}     1
      {{x44852000 0}}}
     {a spx x44b40000 spy x44070000 sb 1 ltn x44852000 ltm x44852000 tt x40e00000}}}}}}
   toolbox {selectAll {
  { selectAll str 1 ssx 1 ssy 1 sf 1 }
  { createBezier str 1 ssx 1 ssy 1 sf 1 sb 1 tt 4 }
  { createBezierCusped str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { createBSpline str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { createEllipse str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { createRectangle str 1 ssx 1 ssy 1 sf 1 sb 1 tt 7 }
  { createRectangleCusped str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { brush str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { eraser src 2 str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { clone src 1 str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { reveal src 3 str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { dodge src 1 str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { burn src 1 str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { blur src 1 str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { sharpen src 1 str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { smear src 1 str 1 ssx 1 ssy 1 sf 1 sb 1 }
} }
   toolbar_brush_hardness 0.200000003
   toolbar_source_transform_scale {1 1}
   toolbar_source_transform_center {320 240}
   colorOverlay 0
   lifetime_type "all frames"
   lifetime_start 1065
   lifetime_end 1065
   view {}
   motionblur_on true
   motionblur_shutter_offset_type centred
   source_black_outside true
   name Roto37
   xpos 906
   ypos -525
   disable true
  }
set N9c81a000 [stack 0]
  Dot {
   name Dot14
   xpos 940
   ypos -499
  }
set N9c8a7800 [stack 0]
  Blur {
   channels rgba
   size {{width/2*mmult}}
   name MasterBlur
   xpos 2710
   ypos 60
   disable {{defocus}}
   addUserKnob {20 User}
   addUserKnob {7 numControl}
   numControl 10
  }
  Defocus {
   channels rgba
   defocus {{input.size}}
   name Defocus1
   xpos 2710
   ypos 86
   disable {{1-input.disable}}
  }
  Grade {
   white {3.359999895 0.05999999866 0.09200000018 1}
   add {0.25 -0.09399999678 -0.07999999821 0}
   name Grade67
   xpos 2710
   ypos 120
   disable true
  }
push $N30dbca00
  Grade {
   blackpoint {{lower i}}
   whitepoint {{upper i}}
   name Grade69
   xpos 2600
   ypos 68
   addUserKnob {20 User}
   addUserKnob {7 upper}
   upper {{divide*num i}}
   addUserKnob {7 lower}
   lower {{upper-divide i}}
   addUserKnob {7 total}
   total {{parent.MasterBlur.numControl i}}
   addUserKnob {7 center}
   addUserKnob {7 divide}
   divide {{1/total i x1065 inf}}
   addUserKnob {7 num}
   num 9
  }
  Shuffle {
   alpha red
   name Shuffle24
   xpos 2600
   ypos 94
  }
push $N9c8a7800
  Blur {
   channels rgba
   size {{parent.MasterBlur.size/num*mult i}}
   name Blur35
   xpos 2490
   ypos 60
   disable {{defocus}}
   addUserKnob {20 User}
   addUserKnob {7 mult}
   mult 9
   addUserKnob {7 num}
   num {{parent.MasterBlur.numControl i}}
  }
  Defocus {
   channels rgba
   defocus {{input.size}}
   name Defocus2
   xpos 2490
   ypos 86
   disable {{1-input.disable}}
  }
  Grade {
   white {3.359999895 0.05999999866 0.09200000018 1}
   add {0.25 -0.09399999678 -0.07999999821 0}
   name Grade70
   xpos 2490
   ypos 120
   disable true
  }
push $N30dbca00
  Grade {
   blackpoint {{lower i}}
   whitepoint {{upper i}}
   name Grade75
   xpos 2380
   ypos 68
   addUserKnob {20 User}
   addUserKnob {7 upper}
   upper {{divide*num i}}
   addUserKnob {7 lower}
   lower {{upper-divide i}}
   addUserKnob {7 total}
   total {{parent.MasterBlur.numControl i}}
   addUserKnob {7 center}
   addUserKnob {7 divide}
   divide {{1/total i x1065 inf}}
   addUserKnob {7 num}
   num 8
  }
  Shuffle {
   alpha red
   name Shuffle25
   xpos 2380
   ypos 94
  }
push $N9c8a7800
  Blur {
   channels rgba
   size {{parent.MasterBlur.size/num*mult i}}
   name Blur41
   xpos 2270
   ypos 60
   disable {{defocus}}
   addUserKnob {20 User}
   addUserKnob {7 mult}
   mult 8
   addUserKnob {7 num}
   num {{parent.MasterBlur.numControl i}}
  }
  Defocus {
   channels rgba
   defocus {{input.size}}
   name Defocus3
   xpos 2270
   ypos 86
   disable {{1-input.disable}}
  }
  Grade {
   white {3.359999895 0.05999999866 0.09200000018 1}
   add {0.25 -0.09399999678 -0.07999999821 0}
   name Grade76
   xpos 2270
   ypos 120
   disable true
  }
push $N30dbca00
  Grade {
   blackpoint {{lower i}}
   whitepoint {{upper i}}
   name Grade77
   xpos 2160
   ypos 68
   addUserKnob {20 User}
   addUserKnob {7 upper}
   upper {{divide*num i}}
   addUserKnob {7 lower}
   lower {{upper-divide i}}
   addUserKnob {7 total}
   total {{parent.MasterBlur.numControl i}}
   addUserKnob {7 center}
   addUserKnob {7 divide}
   divide {{1/total i x1065 inf}}
   addUserKnob {7 num}
   num 7
  }
  Shuffle {
   alpha red
   name Shuffle26
   xpos 2160
   ypos 94
  }
push $N9c8a7800
  Blur {
   channels rgba
   size {{parent.MasterBlur.size/num*mult i}}
   name Blur42
   xpos 2050
   ypos 60
   disable {{defocus}}
   addUserKnob {20 User}
   addUserKnob {7 mult}
   mult 7
   addUserKnob {7 num}
   num {{parent.MasterBlur.numControl i}}
  }
  Defocus {
   channels rgba
   defocus {{input.size}}
   name Defocus4
   xpos 2050
   ypos 86
   disable {{1-input.disable}}
  }
  Grade {
   white {3.359999895 0.05999999866 0.09200000018 1}
   add {0.25 -0.09399999678 -0.07999999821 0}
   name Grade78
   xpos 2050
   ypos 120
   disable true
  }
push $N30dbca00
  Grade {
   blackpoint {{lower i}}
   whitepoint {{upper i}}
   name Grade79
   xpos 1940
   ypos 68
   addUserKnob {20 User}
   addUserKnob {7 upper}
   upper {{divide*num i}}
   addUserKnob {7 lower}
   lower {{upper-divide i}}
   addUserKnob {7 total}
   total {{parent.MasterBlur.numControl i}}
   addUserKnob {7 center}
   addUserKnob {7 divide}
   divide {{1/total i x1065 inf}}
   addUserKnob {7 num}
   num 6
  }
  Shuffle {
   alpha red
   name Shuffle27
   xpos 1940
   ypos 94
  }
push $N9c8a7800
  Blur {
   channels rgba
   size {{parent.MasterBlur.size/num*mult i}}
   name Blur43
   xpos 1830
   ypos 60
   disable {{defocus}}
   addUserKnob {20 User}
   addUserKnob {7 mult}
   mult 6
   addUserKnob {7 num}
   num {{parent.MasterBlur.numControl i}}
  }
  Defocus {
   channels rgba
   defocus {{input.size}}
   name Defocus5
   xpos 1830
   ypos 86
   disable {{1-input.disable}}
  }
  Grade {
   white {3.359999895 0.05999999866 0.09200000018 1}
   add {0.25 -0.09399999678 -0.07999999821 0}
   name Grade80
   xpos 1830
   ypos 120
   disable true
  }
push $N30dbca00
  Grade {
   blackpoint {{lower i}}
   whitepoint {{upper i}}
   name Grade81
   xpos 1720
   ypos 68
   addUserKnob {20 User}
   addUserKnob {7 upper}
   upper {{divide*num i}}
   addUserKnob {7 lower}
   lower {{upper-divide i}}
   addUserKnob {7 total}
   total {{parent.MasterBlur.numControl i}}
   addUserKnob {7 center}
   addUserKnob {7 divide}
   divide {{1/total i x1065 inf}}
   addUserKnob {7 num}
   num 5
  }
  Shuffle {
   alpha red
   name Shuffle28
   xpos 1720
   ypos 94
  }
push $N9c8a7800
  Blur {
   channels rgba
   size {{parent.MasterBlur.size/num*mult i}}
   name Blur44
   xpos 1610
   ypos 60
   disable {{defocus}}
   addUserKnob {20 User}
   addUserKnob {7 mult}
   mult 5
   addUserKnob {7 num}
   num {{parent.MasterBlur.numControl i}}
  }
  Defocus {
   channels rgba
   defocus {{input.size}}
   name Defocus6
   xpos 1610
   ypos 86
   disable {{1-input.disable}}
  }
  Grade {
   white {3.359999895 0.05999999866 0.09200000018 1}
   add {0.25 -0.09399999678 -0.07999999821 0}
   name Grade86
   xpos 1610
   ypos 120
   disable true
  }
push $N30dbca00
  Grade {
   blackpoint {{lower i}}
   whitepoint {{upper i}}
   name Grade82
   xpos 1500
   ypos 68
   addUserKnob {20 User}
   addUserKnob {7 upper}
   upper {{divide*num i}}
   addUserKnob {7 lower}
   lower {{upper-divide i}}
   addUserKnob {7 total}
   total {{parent.MasterBlur.numControl i}}
   addUserKnob {7 center}
   addUserKnob {7 divide}
   divide {{1/total i x1065 inf}}
   addUserKnob {7 num}
   num 4
  }
  Shuffle {
   alpha red
   name Shuffle29
   xpos 1500
   ypos 94
  }
push $N9c8a7800
  Blur {
   channels rgba
   size {{parent.MasterBlur.size/num*mult i}}
   name Blur48
   xpos 1390
   ypos 60
   disable {{defocus}}
   addUserKnob {20 User}
   addUserKnob {7 mult}
   mult 4
   addUserKnob {7 num}
   num {{parent.MasterBlur.numControl i}}
  }
  Defocus {
   channels rgba
   defocus {{input.size}}
   name Defocus7
   xpos 1390
   ypos 86
   disable {{1-input.disable}}
  }
  Grade {
   white {3.359999895 0.05999999866 0.09200000018 1}
   add {0.25 -0.09399999678 -0.07999999821 0}
   name Grade90
   xpos 1390
   ypos 120
   disable true
  }
push $N30dbca00
  Grade {
   blackpoint {{lower i}}
   whitepoint {{upper i}}
   name Grade83
   xpos 1280
   ypos 68
   addUserKnob {20 User}
   addUserKnob {7 upper}
   upper {{divide*num i}}
   addUserKnob {7 lower}
   lower {{upper-divide i}}
   addUserKnob {7 total}
   total {{parent.MasterBlur.numControl i}}
   addUserKnob {7 center}
   addUserKnob {7 divide}
   divide {{1/total i x1065 inf}}
   addUserKnob {7 num}
   num 3
  }
  Shuffle {
   alpha red
   name Shuffle30
   xpos 1280
   ypos 94
  }
push $N9c8a7800
  Blur {
   channels rgba
   size {{parent.MasterBlur.size/num*mult i}}
   name Blur45
   xpos 1170
   ypos 60
   disable {{defocus}}
   addUserKnob {20 User}
   addUserKnob {7 mult}
   mult 3
   addUserKnob {7 num}
   num {{parent.MasterBlur.numControl i}}
  }
  Defocus {
   channels rgba
   defocus {{input.size}}
   name Defocus8
   xpos 1170
   ypos 86
   disable {{1-input.disable}}
  }
  Grade {
   white {3.359999895 0.05999999866 0.09200000018 1}
   add {0.25 -0.09399999678 -0.07999999821 0}
   name Grade87
   xpos 1170
   ypos 120
   disable true
  }
push $N30dbca00
  Grade {
   blackpoint {{lower i}}
   whitepoint {{upper i}}
   name Grade84
   xpos 1060
   ypos 68
   addUserKnob {20 User}
   addUserKnob {7 upper}
   upper {{divide*num i}}
   addUserKnob {7 lower}
   lower {{upper-divide i}}
   addUserKnob {7 total}
   total {{parent.MasterBlur.numControl i}}
   addUserKnob {7 center}
   addUserKnob {7 divide}
   divide {{1/total i x1065 inf}}
   addUserKnob {7 num}
   num 2
  }
  Shuffle {
   alpha red
   name Shuffle31
   xpos 1060
   ypos 94
  }
push $N9c8a7800
  Blur {
   channels rgba
   size {{parent.MasterBlur.size/num*mult i}}
   name Blur46
   xpos 950
   ypos 60
   disable {{defocus}}
   addUserKnob {20 User}
   addUserKnob {7 mult}
   mult 2
   addUserKnob {7 num}
   num {{parent.MasterBlur.numControl i}}
  }
  Defocus {
   channels rgba
   defocus {{input.size}}
   name Defocus10
   xpos 950
   ypos 86
   disable {{1-input.disable}}
  }
  Grade {
   white {3.359999895 0.05999999866 0.09200000018 1}
   add {0.25 -0.09399999678 -0.07999999821 0}
   name Grade88
   xpos 950
   ypos 120
   disable true
  }
push $N30dbca00
  Grade {
   blackpoint {{lower}}
   whitepoint {{upper}}
   name Grade85
   xpos 840
   ypos 68
   addUserKnob {20 User}
   addUserKnob {7 upper}
   upper {{divide*num}}
   addUserKnob {7 lower}
   lower {{upper-divide}}
   addUserKnob {7 total}
   total {{parent.MasterBlur.numControl}}
   addUserKnob {7 center}
   addUserKnob {7 divide}
   divide {{1/total x1065 inf}}
   addUserKnob {7 num}
   num 1
  }
  Shuffle {
   alpha red
   name Shuffle32
   xpos 840
   ypos 94
  }
push $N9c8a7800
  Blur {
   channels rgba
   size {{parent.MasterBlur.size/num*mult i}}
   name Blur47
   xpos 730
   ypos 60
   disable {{defocus}}
   addUserKnob {20 User}
   addUserKnob {7 mult}
   mult 1
   addUserKnob {7 num}
   num {{parent.MasterBlur.numControl i}}
  }
  Defocus {
   channels rgba
   defocus {{input.size}}
   name Defocus9
   xpos 730
   ypos 86
   disable {{1-input.disable}}
  }
  Grade {
   white {3.359999895 0.05999999866 0.09200000018 1}
   add {0.25 -0.09399999678 -0.07999999821 0}
   name Grade89
   xpos 730
   ypos 120
   disable true
  }
push $N9c81a000
  Keymix {
   inputs 3
   name Keymix15
   xpos 840
   ypos 120
  }
  Keymix {
   inputs 3
   name Keymix14
   xpos 1060
   ypos 120
  }
  Keymix {
   inputs 3
   name Keymix13
   xpos 1280
   ypos 120
  }
  Keymix {
   inputs 3
   name Keymix12
   xpos 1500
   ypos 120
  }
  Keymix {
   inputs 3
   name Keymix11
   xpos 1720
   ypos 120
  }
  Keymix {
   inputs 3
   name Keymix6
   xpos 1940
   ypos 120
  }
  Keymix {
   inputs 3
   name Keymix7
   xpos 2160
   ypos 120
  }
  Keymix {
   inputs 3
   name Keymix8
   xpos 2380
   ypos 120
  }
  Keymix {
   inputs 3
   name Keymix9
   xpos 2600
   ypos 120
  }
  Keymix {
   inputs 3
   name Keymix10
   xpos 2820
   ypos 120
  }
  Output {
   name Output1
   xpos 2820
   ypos 146
  }
 end_group
set N9c914000 [stack 0]
 Grade {
  channels alpha
  white_clamp true
  name grade_matte
  xpos 144
  ypos 2376
 }
 Constant {
  inputs 0
  channels rgb
  name Constant2
  xpos -1698
  ypos 165
 }
 Reformat {
  type "to box"
  box_width {{FormatReceiver.width}}
  box_height {{FormatReceiver.height}}
  box_fixed true
  box_pixel_aspect {{FormatReceiver.pixel_aspect}}
  resize distort
  name Reformat5
  xpos -1698
  ypos 237
 }
 Expression {
  expr0 x/width
  expr1 y/height
  name Expression1
  xpos -1698
  ypos 263
 }
 ColorLookup {
  channels alpha
  lut {master {curve C k 0 s0 1 s0}
    red {}
    green {}
    blue {}
    alpha {}}
  name ColorLookup1
  xpos -1698
  ypos 289
 }
 Blur {
  name Blur3
  xpos -1698
  ypos 327
  disable true
 }
set N9c83be00 [stack 0]
 Expression {
  expr3 (g<0.5?g:1-g)*2
  name Expression16
  xpos -39
  ypos 1747
  hide_input true
 }
 ColorLookup {
  channels alpha
  lut {master {curve C k 0 s0 1 s0}
    red {}
    green {}
    blue {}
    alpha {}}
  mix {{parent.ctrl.falloff}}
  name ColorLookup15
  xpos -39
  ypos 1773
 }
 Shuffle {
  red alpha
  green alpha
  blue alpha
  name Shuffle4
  xpos -39
  ypos 1805
  postage_stamp true
 }
push $N9c83be00
 Expression {
  expr3 r
  name Expression14
  xpos 402
  ypos 1445
  hide_input true
 }
 ColorLookup {
  channels alpha
  lut {master {curve C k 0 s0 1 s0}
    red {}
    green {}
    blue {}
    alpha {}}
  mix {{parent.ctrl.falloff}}
  name ColorLookup13
  xpos 402
  ypos 1471
 }
 Shuffle {
  red alpha
  green alpha
  blue alpha
  name Shuffle3
  xpos 402
  ypos 1509
  postage_stamp true
 }
push $Nb6841c00
 Blur {
  name BlurInput
  xpos -1193
  ypos 232
 }
 CornerPin2D {
  to1 {569 792}
  to2 {1637 366}
  to3 {1927 1990}
  to4 {526 1602}
  invert true
  from1 {0 0}
  from2 {{input.width} 0}
  from3 {{input.width} {input.height}}
  from4 {0 {input.height}}
  name CornerPin2D2
  xpos -1190
  ypos 279
  disable true
 }
 CornerPin2D {
  to1 {{parent.___MainCP_A2.to1} {parent.___MainCP_A2.to1}}
  to2 {{parent.___MainCP_A2.to2} {parent.___MainCP_A2.to2}}
  to3 {{parent.___MainCP_A2.to3} {parent.___MainCP_A2.to3}}
  to4 {{parent.___MainCP_A2.to4} {parent.___MainCP_A2.to4}}
  invert false
  shutter 1.45
  from1 {{parent.___MainCP_A2.from1} {parent.___MainCP_A2.from1}}
  from2 {{parent.___MainCP_A2.from2} {parent.___MainCP_A2.from2}}
  from3 {{parent.___MainCP_A2.from3} {parent.___MainCP_A2.from3}}
  from4 {{parent.___MainCP_A2.from4} {parent.___MainCP_A2.from4}}
  name CP_in
  xpos -1190
  ypos 305
 }
set N9c852a00 [stack 0]
 Crop {
  box {{width-1 x1043 3413} 0 {width} {height}}
  crop false
  name Crop13
  tile_color 0xff0000ff
  xpos 1267
  ypos 1515
  hide_input true
  postage_stamp true
 }
 Grade {
  white 0
  add {0 0 1 0}
  add_panelDropped true
  black_clamp false
  name Grade3
  xpos 1267
  ypos 1587
  disable true
  postage_stamp true
 }
push $N9c852a00
 Crop {
  box {{0 x1043 3413} 0 1 {height}}
  crop false
  name Crop15
  tile_color 0xff0000ff
  xpos 171
  ypos 1515
  hide_input true
  postage_stamp true
 }
 Grade {
  white 0
  add {1 0 0 0}
  add_panelDropped true
  black_clamp false
  name Grade1
  xpos 171
  ypos 1587
  disable true
  postage_stamp true
 }
 Keymix {
  inputs 3
  name Keymix14
  xpos 402
  ypos 1581
  postage_stamp true
 }
set N29209a00 [stack 0]
push $N9c83be00
 Expression {
  expr3 g
  name Expression15
  xpos 429
  ypos 1675
  hide_input true
 }
 ColorLookup {
  channels alpha
  lut {master {curve C k 0 s0 1 s0}
    red {}
    green {}
    blue {}
    alpha {}}
  mix {{parent.ctrl.falloff}}
  name ColorLookup14
  xpos 429
  ypos 1701
 }
 Shuffle {
  red alpha
  green alpha
  blue alpha
  name Shuffle2
  xpos 429
  ypos 1739
  postage_stamp true
 }
push $N9c852a00
 Crop {
  box {0 {height-1} {width x1043 3414} {height x1043 12197}}
  crop false
  name Crop11
  tile_color 0xff0000ff
  xpos 846
  ypos 1159
  hide_input true
  postage_stamp true
 }
 Grade {
  white 0
  add {0 1 0 0}
  add_panelDropped true
  black_clamp false
  name Grade2
  xpos 846
  ypos 1231
  disable true
  postage_stamp true
 }
set N2920d200 [stack 0]
push $N9c852a00
 Crop {
  box {0 0 {width} 1}
  crop false
  name Crop9
  tile_color 0xff0000ff
  xpos 866
  ypos 1825
  hide_input true
  postage_stamp true
 }
 Grade {
  white 0
  add {1 0 1 0}
  add_panelDropped true
  black_clamp false
  name Grade4
  xpos 866
  ypos 1897
  disable true
  postage_stamp true
 }
 Keymix {
  inputs 3
  name Keymix13
  xpos 429
  ypos 1811
  postage_stamp true
 }
set N291f5600 [stack 0]
 Keymix {
  inputs 3
  name Keymix15
  xpos -39
  ypos 2021
  postage_stamp true
 }
push $N9c83be00
 Expression {
  expr3 (r<0.5?r:1-r)*2
  name Expression17
  xpos -234
  ypos 1754
  hide_input true
 }
 ColorLookup {
  channels alpha
  lut {master {curve C k 0 s0 1 s0}
    red {}
    green {}
    blue {}
    alpha {}}
  mix {{parent.ctrl.falloff}}
  name ColorLookup16
  xpos -234
  ypos 1784
 }
 Shuffle {
  red alpha
  green alpha
  blue alpha
  name Shuffle5
  xpos -234
  ypos 1816
  postage_stamp true
 }
push $N291f5600
push $N29209a00
 Keymix {
  inputs 3
  name Keymix16
  xpos -234
  ypos 2033
  postage_stamp true
 }
 Keymix {
  inputs 3
  name Keymix17
  xpos -39
  ypos 2376
 }
 Group {
  inputs 2
  name iblur_patch
  xpos -39
  ypos 2493
  addUserKnob {20 User}
  addUserKnob {41 size T MasterBlur.size}
  addUserKnob {4 defocus l "What you want?" M {Blur Defocus ""}}
 }
  Input {
   inputs 0
   name Matte
   xpos 1016
   ypos -551
   number 1
  }
  Shuffle {
   red alpha
   green alpha
   blue alpha
   name Shuffle1
   xpos 1016
   ypos -525
  }
  Roto {
   cliptype none
   curves {{{v x3f99999a}
  {f 0}
  {n
   {layer Root
    {f 512}
    {t x44b40000 x44070000}
    {a}
    {curvegroup Bezier1 576 bezier
     {{cc
       {f 8192}
       {px x44852000
        {x3e752008 xbffe2824}
        {x43b70000 x435a0000}
        {xbe754003 x3ffe2920}
        {x3f838c00 x4102e925}
        {x44538000 x439c0000}
        {xbf838c00 xc102e91a}
        {x405b07f2 xc13ac986}
        {x44520000 x439b0000}
        {xc05b07f2 x413ac986}
        {xc135d70a x412b758e}
        {x43b60000 x43580000}
        {x4135d639 xc12b7660}}}
      {cc
       {f 8192}
       {px x44852000
        {x3e752008 xbffe2824}
        {0 0}
        {xbe754003 x3ffe2920}
        {x3f838c00 x4102e925}
        {0 0}
        {xbf838c00 xc102e91a}
        {x405b0a13 xc13ac91d}
        {x42480000 x44150000}
        {xc05b07f2 x413aca58}
        {xc135d639 x412b75f7}
        {xc2900000 x44280000}
        {x4135d639 xc12b758e}}}}
     {t
      {{x44852000 x44500000}}
      {{x44852000 x44194000}}     0
      {{x44852000 0}}
      {{x44852000 0}}     0 0 0
      {{x44852000 0}}
      {{x44852000 1}}
      {{x44852000 1}}     1
      {{x44852000 0}}}
     {a spx x44b40000 spy x44070000 sb 1 ltn x44852000 ltm x44852000 tt x40800000}}}}}}
   toolbox {selectAll {
  { selectAll str 1 ssx 1 ssy 1 sf 1 }
  { createBezier str 1 ssx 1 ssy 1 sf 1 sb 1 tt 4 }
  { createBezierCusped str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { createBSpline str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { createEllipse str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { createRectangle str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { createRectangleCusped str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { brush str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { eraser src 2 str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { clone src 1 str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { reveal src 3 str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { dodge src 1 str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { burn src 1 str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { blur src 1 str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { sharpen src 1 str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { smear src 1 str 1 ssx 1 ssy 1 sf 1 sb 1 }
} }
   toolbar_brush_hardness 0.200000003
   toolbar_source_transform_scale {1 1}
   toolbar_source_transform_center {320 240}
   colorOverlay 0
   lifetime_type "all frames"
   lifetime_start 1065
   lifetime_end 1065
   motionblur_shutter_offset_type centred
   source_translate_round false
   source_black_outside true
   name Roto36
   xpos 1016
   ypos -499
   disable true
  }
set N2906ac00 [stack 0]
  Grade {
   blackpoint {{lower i}}
   whitepoint {{upper i}}
   name Grade66
   xpos 2820
   ypos 68
   addUserKnob {20 User}
   addUserKnob {7 upper}
   upper {{divide*num i}}
   addUserKnob {7 lower}
   lower {{upper-divide i}}
   addUserKnob {7 total}
   total {{parent.MasterBlur.numControl i}}
   addUserKnob {7 center}
   addUserKnob {7 divide}
   divide {{1/total i x1065 inf}}
   addUserKnob {7 num}
   num 10
  }
  Shuffle {
   alpha red
   name Shuffle23
   xpos 2820
   ypos 94
  }
  Input {
   inputs 0
   name Image
   xpos 906
   ypos -551
  }
  Roto {
   cliptype none
   curves {{{v x3f99999a}
  {f 0}
  {n
   {layer Root
    {f 512}
    {t x44b40000 x44070000}
    {a}
    {curvegroup Rectangle1 512 bezier
     {{cc
       {f 8192}
       {px x44852000
        {0 xc3b95560}
        {x43ef0000 x44898000}
        {x40c00000 0}
        {xc0c00000 0}
        {x43f80000 x44898000}
        {0 xc3b95560}
        {0 x43b95560}
        {x43f80000 xc1400000}
        {xc0c00000 0}
        {x40c00000 0}
        {x43ef0000 xc1400000}
        {0 x43b95560}}}     idem}
     {t
      {{x44852000 x43f38000}}
      {{x44852000 x44080000}}     0
      {{x44852000 0}}
      {{x44852000 0}}     0 0 0
      {{x44852000 0}}
      {{x44852000 1}}
      {{x44852000 1}}     1
      {{x44852000 0}}}
     {a spx x44b40000 spy x44070000 sb 1 ltn x44852000 ltm x44852000 tt x40e00000}}}}}}
   toolbox {selectAll {
  { selectAll str 1 ssx 1 ssy 1 sf 1 }
  { createBezier str 1 ssx 1 ssy 1 sf 1 sb 1 tt 4 }
  { createBezierCusped str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { createBSpline str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { createEllipse str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { createRectangle str 1 ssx 1 ssy 1 sf 1 sb 1 tt 7 }
  { createRectangleCusped str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { brush str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { eraser src 2 str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { clone src 1 str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { reveal src 3 str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { dodge src 1 str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { burn src 1 str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { blur src 1 str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { sharpen src 1 str 1 ssx 1 ssy 1 sf 1 sb 1 }
  { smear src 1 str 1 ssx 1 ssy 1 sf 1 sb 1 }
} }
   toolbar_brush_hardness 0.200000003
   toolbar_source_transform_scale {1 1}
   toolbar_source_transform_center {320 240}
   colorOverlay 0
   lifetime_type "all frames"
   lifetime_start 1065
   lifetime_end 1065
   view {}
   motionblur_on true
   motionblur_shutter_offset_type centred
   source_black_outside true
   name Roto37
   xpos 906
   ypos -525
   disable true
  }
set N29079e00 [stack 0]
  Dot {
   name Dot14
   xpos 940
   ypos -499
  }
set N2913e000 [stack 0]
  Blur {
   channels rgba
   size 100
   name MasterBlur
   xpos 2710
   ypos 60
   disable {{defocus}}
   addUserKnob {20 User}
   addUserKnob {7 numControl}
   numControl 10
  }
  Defocus {
   channels rgba
   defocus {{input.size}}
   name Defocus1
   xpos 2710
   ypos 86
   disable {{1-input.disable}}
  }
  Grade {
   white {3.359999895 0.05999999866 0.09200000018 1}
   add {0.25 -0.09399999678 -0.07999999821 0}
   name Grade67
   xpos 2710
   ypos 120
   disable true
  }
push $N2906ac00
  Grade {
   blackpoint {{lower i}}
   whitepoint {{upper i}}
   name Grade69
   xpos 2600
   ypos 68
   addUserKnob {20 User}
   addUserKnob {7 upper}
   upper {{divide*num i}}
   addUserKnob {7 lower}
   lower {{upper-divide i}}
   addUserKnob {7 total}
   total {{parent.MasterBlur.numControl i}}
   addUserKnob {7 center}
   addUserKnob {7 divide}
   divide {{1/total i x1065 inf}}
   addUserKnob {7 num}
   num 9
  }
  Shuffle {
   alpha red
   name Shuffle24
   xpos 2600
   ypos 94
  }
push $N2913e000
  Blur {
   channels rgba
   size {{parent.MasterBlur.size/num*mult i}}
   name Blur35
   xpos 2490
   ypos 60
   disable {{defocus}}
   addUserKnob {20 User}
   addUserKnob {7 mult}
   mult 9
   addUserKnob {7 num}
   num {{parent.MasterBlur.numControl i}}
  }
  Defocus {
   channels rgba
   defocus {{input.size}}
   name Defocus2
   xpos 2490
   ypos 86
   disable {{1-input.disable}}
  }
  Grade {
   white {3.359999895 0.05999999866 0.09200000018 1}
   add {0.25 -0.09399999678 -0.07999999821 0}
   name Grade70
   xpos 2490
   ypos 120
   disable true
  }
push $N2906ac00
  Grade {
   blackpoint {{lower i}}
   whitepoint {{upper i}}
   name Grade75
   xpos 2380
   ypos 68
   addUserKnob {20 User}
   addUserKnob {7 upper}
   upper {{divide*num i}}
   addUserKnob {7 lower}
   lower {{upper-divide i}}
   addUserKnob {7 total}
   total {{parent.MasterBlur.numControl i}}
   addUserKnob {7 center}
   addUserKnob {7 divide}
   divide {{1/total i x1065 inf}}
   addUserKnob {7 num}
   num 8
  }
  Shuffle {
   alpha red
   name Shuffle25
   xpos 2380
   ypos 94
  }
push $N2913e000
  Blur {
   channels rgba
   size {{parent.MasterBlur.size/num*mult i}}
   name Blur41
   xpos 2270
   ypos 60
   disable {{defocus}}
   addUserKnob {20 User}
   addUserKnob {7 mult}
   mult 8
   addUserKnob {7 num}
   num {{parent.MasterBlur.numControl i}}
  }
  Defocus {
   channels rgba
   defocus {{input.size}}
   name Defocus3
   xpos 2270
   ypos 86
   disable {{1-input.disable}}
  }
  Grade {
   white {3.359999895 0.05999999866 0.09200000018 1}
   add {0.25 -0.09399999678 -0.07999999821 0}
   name Grade76
   xpos 2270
   ypos 120
   disable true
  }
push $N2906ac00
  Grade {
   blackpoint {{lower i}}
   whitepoint {{upper i}}
   name Grade77
   xpos 2160
   ypos 68
   addUserKnob {20 User}
   addUserKnob {7 upper}
   upper {{divide*num i}}
   addUserKnob {7 lower}
   lower {{upper-divide i}}
   addUserKnob {7 total}
   total {{parent.MasterBlur.numControl i}}
   addUserKnob {7 center}
   addUserKnob {7 divide}
   divide {{1/total i x1065 inf}}
   addUserKnob {7 num}
   num 7
  }
  Shuffle {
   alpha red
   name Shuffle26
   xpos 2160
   ypos 94
  }
push $N2913e000
  Blur {
   channels rgba
   size {{parent.MasterBlur.size/num*mult i}}
   name Blur42
   xpos 2050
   ypos 60
   disable {{defocus}}
   addUserKnob {20 User}
   addUserKnob {7 mult}
   mult 7
   addUserKnob {7 num}
   num {{parent.MasterBlur.numControl i}}
  }
  Defocus {
   channels rgba
   defocus {{input.size}}
   name Defocus4
   xpos 2050
   ypos 86
   disable {{1-input.disable}}
  }
  Grade {
   white {3.359999895 0.05999999866 0.09200000018 1}
   add {0.25 -0.09399999678 -0.07999999821 0}
   name Grade78
   xpos 2050
   ypos 120
   disable true
  }
push $N2906ac00
  Grade {
   blackpoint {{lower i}}
   whitepoint {{upper i}}
   name Grade79
   xpos 1940
   ypos 68
   addUserKnob {20 User}
   addUserKnob {7 upper}
   upper {{divide*num i}}
   addUserKnob {7 lower}
   lower {{upper-divide i}}
   addUserKnob {7 total}
   total {{parent.MasterBlur.numControl i}}
   addUserKnob {7 center}
   addUserKnob {7 divide}
   divide {{1/total i x1065 inf}}
   addUserKnob {7 num}
   num 6
  }
  Shuffle {
   alpha red
   name Shuffle27
   xpos 1940
   ypos 94
  }
push $N2913e000
  Blur {
   channels rgba
   size {{parent.MasterBlur.size/num*mult i}}
   name Blur43
   xpos 1830
   ypos 60
   disable {{defocus}}
   addUserKnob {20 User}
   addUserKnob {7 mult}
   mult 6
   addUserKnob {7 num}
   num {{parent.MasterBlur.numControl i}}
  }
  Defocus {
   channels rgba
   defocus {{input.size}}
   name Defocus5
   xpos 1830
   ypos 86
   disable {{1-input.disable}}
  }
  Grade {
   white {3.359999895 0.05999999866 0.09200000018 1}
   add {0.25 -0.09399999678 -0.07999999821 0}
   name Grade80
   xpos 1830
   ypos 120
   disable true
  }
push $N2906ac00
  Grade {
   blackpoint {{lower i}}
   whitepoint {{upper i}}
   name Grade81
   xpos 1720
   ypos 68
   addUserKnob {20 User}
   addUserKnob {7 upper}
   upper {{divide*num i}}
   addUserKnob {7 lower}
   lower {{upper-divide i}}
   addUserKnob {7 total}
   total {{parent.MasterBlur.numControl i}}
   addUserKnob {7 center}
   addUserKnob {7 divide}
   divide {{1/total i x1065 inf}}
   addUserKnob {7 num}
   num 5
  }
  Shuffle {
   alpha red
   name Shuffle28
   xpos 1720
   ypos 94
  }
push $N2913e000
  Blur {
   channels rgba
   size {{parent.MasterBlur.size/num*mult i}}
   name Blur44
   xpos 1610
   ypos 60
   disable {{defocus}}
   addUserKnob {20 User}
   addUserKnob {7 mult}
   mult 5
   addUserKnob {7 num}
   num {{parent.MasterBlur.numControl i}}
  }
  Defocus {
   channels rgba
   defocus {{input.size}}
   name Defocus6
   xpos 1610
   ypos 86
   disable {{1-input.disable}}
  }
  Grade {
   white {3.359999895 0.05999999866 0.09200000018 1}
   add {0.25 -0.09399999678 -0.07999999821 0}
   name Grade86
   xpos 1610
   ypos 120
   disable true
  }
push $N2906ac00
  Grade {
   blackpoint {{lower i}}
   whitepoint {{upper i}}
   name Grade82
   xpos 1500
   ypos 68
   addUserKnob {20 User}
   addUserKnob {7 upper}
   upper {{divide*num i}}
   addUserKnob {7 lower}
   lower {{upper-divide i}}
   addUserKnob {7 total}
   total {{parent.MasterBlur.numControl i}}
   addUserKnob {7 center}
   addUserKnob {7 divide}
   divide {{1/total i x1065 inf}}
   addUserKnob {7 num}
   num 4
  }
  Shuffle {
   alpha red
   name Shuffle29
   xpos 1500
   ypos 94
  }
push $N2913e000
  Blur {
   channels rgba
   size {{parent.MasterBlur.size/num*mult i}}
   name Blur48
   xpos 1390
   ypos 60
   disable {{defocus}}
   addUserKnob {20 User}
   addUserKnob {7 mult}
   mult 4
   addUserKnob {7 num}
   num {{parent.MasterBlur.numControl i}}
  }
  Defocus {
   channels rgba
   defocus {{input.size}}
   name Defocus7
   xpos 1390
   ypos 86
   disable {{1-input.disable}}
  }
  Grade {
   white {3.359999895 0.05999999866 0.09200000018 1}
   add {0.25 -0.09399999678 -0.07999999821 0}
   name Grade90
   xpos 1390
   ypos 120
   disable true
  }
push $N2906ac00
  Grade {
   blackpoint {{lower i}}
   whitepoint {{upper i}}
   name Grade83
   xpos 1280
   ypos 68
   addUserKnob {20 User}
   addUserKnob {7 upper}
   upper {{divide*num i}}
   addUserKnob {7 lower}
   lower {{upper-divide i}}
   addUserKnob {7 total}
   total {{parent.MasterBlur.numControl i}}
   addUserKnob {7 center}
   addUserKnob {7 divide}
   divide {{1/total i x1065 inf}}
   addUserKnob {7 num}
   num 3
  }
  Shuffle {
   alpha red
   name Shuffle30
   xpos 1280
   ypos 94
  }
push $N2913e000
  Blur {
   channels rgba
   size {{parent.MasterBlur.size/num*mult i}}
   name Blur45
   xpos 1170
   ypos 60
   disable {{defocus}}
   addUserKnob {20 User}
   addUserKnob {7 mult}
   mult 3
   addUserKnob {7 num}
   num {{parent.MasterBlur.numControl i}}
  }
  Defocus {
   channels rgba
   defocus {{input.size}}
   name Defocus8
   xpos 1170
   ypos 86
   disable {{1-input.disable}}
  }
  Grade {
   white {3.359999895 0.05999999866 0.09200000018 1}
   add {0.25 -0.09399999678 -0.07999999821 0}
   name Grade87
   xpos 1170
   ypos 120
   disable true
  }
push $N2906ac00
  Grade {
   blackpoint {{lower i}}
   whitepoint {{upper i}}
   name Grade84
   xpos 1060
   ypos 68
   addUserKnob {20 User}
   addUserKnob {7 upper}
   upper {{divide*num i}}
   addUserKnob {7 lower}
   lower {{upper-divide i}}
   addUserKnob {7 total}
   total {{parent.MasterBlur.numControl i}}
   addUserKnob {7 center}
   addUserKnob {7 divide}
   divide {{1/total i x1065 inf}}
   addUserKnob {7 num}
   num 2
  }
  Shuffle {
   alpha red
   name Shuffle31
   xpos 1060
   ypos 94
  }
push $N2913e000
  Blur {
   channels rgba
   size {{parent.MasterBlur.size/num*mult i}}
   name Blur46
   xpos 950
   ypos 60
   disable {{defocus}}
   addUserKnob {20 User}
   addUserKnob {7 mult}
   mult 2
   addUserKnob {7 num}
   num {{parent.MasterBlur.numControl i}}
  }
  Defocus {
   channels rgba
   defocus {{input.size}}
   name Defocus10
   xpos 950
   ypos 86
   disable {{1-input.disable}}
  }
  Grade {
   white {3.359999895 0.05999999866 0.09200000018 1}
   add {0.25 -0.09399999678 -0.07999999821 0}
   name Grade88
   xpos 950
   ypos 120
   disable true
  }
push $N2906ac00
  Grade {
   blackpoint {{lower}}
   whitepoint {{upper}}
   name Grade85
   xpos 840
   ypos 68
   addUserKnob {20 User}
   addUserKnob {7 upper}
   upper {{divide*num}}
   addUserKnob {7 lower}
   lower {{upper-divide}}
   addUserKnob {7 total}
   total {{parent.MasterBlur.numControl}}
   addUserKnob {7 center}
   addUserKnob {7 divide}
   divide {{1/total x1065 inf}}
   addUserKnob {7 num}
   num 1
  }
  Shuffle {
   alpha red
   name Shuffle32
   xpos 840
   ypos 94
  }
push $N2913e000
  Blur {
   channels rgba
   size {{parent.MasterBlur.size/num*mult i}}
   name Blur47
   xpos 730
   ypos 60
   disable {{defocus}}
   addUserKnob {20 User}
   addUserKnob {7 mult}
   mult 1
   addUserKnob {7 num}
   num {{parent.MasterBlur.numControl i}}
  }
  Defocus {
   channels rgba
   defocus {{input.size}}
   name Defocus9
   xpos 730
   ypos 86
   disable {{1-input.disable}}
  }
  Grade {
   white {3.359999895 0.05999999866 0.09200000018 1}
   add {0.25 -0.09399999678 -0.07999999821 0}
   name Grade89
   xpos 730
   ypos 120
   disable true
  }
push $N29079e00
  Keymix {
   inputs 3
   name Keymix15
   xpos 840
   ypos 120
  }
  Keymix {
   inputs 3
   name Keymix14
   xpos 1060
   ypos 120
  }
  Keymix {
   inputs 3
   name Keymix13
   xpos 1280
   ypos 120
  }
  Keymix {
   inputs 3
   name Keymix12
   xpos 1500
   ypos 120
  }
  Keymix {
   inputs 3
   name Keymix11
   xpos 1720
   ypos 120
  }
  Keymix {
   inputs 3
   name Keymix6
   xpos 1940
   ypos 120
  }
  Keymix {
   inputs 3
   name Keymix7
   xpos 2160
   ypos 120
  }
  Keymix {
   inputs 3
   name Keymix8
   xpos 2380
   ypos 120
  }
  Keymix {
   inputs 3
   name Keymix9
   xpos 2600
   ypos 120
  }
  Keymix {
   inputs 3
   name Keymix10
   xpos 2820
   ypos 120
  }
  Output {
   name Output1
   xpos 2820
   ypos 146
  }
 end_group
set N29042600 [stack 0]
 Dot {
  name Dot3
  xpos -5
  ypos 2726
 }
push $N9c83be00
 Expression {
  expr3 g
  name Expression13
  xpos 4425
  ypos 2592
  hide_input true
 }
 ColorLookup {
  channels alpha
  lut {master {curve C k 0 s0 1 s0}
    red {}
    green {}
    blue {}
    alpha {}}
  mix {{parent.ctrl.falloff}}
  name ColorLookup11
  xpos 4425
  ypos 2618
 }
push $N9c83be00
 Expression {
  expr3 r
  name Expression7
  xpos 3875
  ypos 1846
  hide_input true
 }
 ColorLookup {
  channels alpha
  lut {master {curve C k 0 s0 1 s0}
    red {}
    green {}
    blue {}
    alpha {}}
  mix {{parent.ctrl.falloff}}
  name ColorLookup10
  xpos 3875
  ypos 1872
 }
push $N9c852a00
 Dot {
  name Dot2
  xpos -933
  ypos 351
 }
set N292bd200 [stack 0]
 Crop {
  box {{width-ctrl.off x1234 2846} {height-ctrl.off} {width} {height}}
  reformat true
  crop false
  name Crop3
  xpos 4902
  ypos 1467
  hide_input true
 }
 Reformat {
  type "to box"
  box_width {{FormatReceiver.width}}
  box_height {{FormatReceiver.height}}
  box_fixed true
  resize distort
  name Reformat20
  xpos 4902
  ypos 1493
  postage_stamp true
 }
 Reformat {
  type "to box"
  box_width {{FormatReceiver.width}}
  box_height {{FormatReceiver.height}}
  box_fixed true
  resize distort
  name Reformat21
  xpos 4902
  ypos 1565
 }
push $N292bd200
 Crop {
  box {0 {height-ctrl.off} {ctrl.off} {height}}
  reformat true
  crop false
  name Crop10
  xpos 3496
  ypos 1471
  hide_input true
 }
 Reformat {
  type "to box"
  box_width {{FormatReceiver.width}}
  box_height {{FormatReceiver.height}}
  box_fixed true
  resize distort
  name Reformat24
  xpos 3496
  ypos 1497
  postage_stamp true
 }
 Reformat {
  type "to box"
  box_width {{FormatReceiver.width}}
  box_height {{FormatReceiver.height}}
  box_fixed true
  resize distort
  name Reformat25
  xpos 3496
  ypos 1569
 }
 Keymix {
  inputs 3
  name Keymix10
  xpos 4145
  ypos 1849
  postage_stamp true
 }
push $N9c83be00
 Expression {
  expr3 r
  name Expression12
  xpos 3920
  ypos 3569
  hide_input true
 }
 ColorLookup {
  channels alpha
  lut {master {curve C k 0 s0 1 s0}
    red {}
    green {}
    blue {}
    alpha {}}
  mix {{parent.ctrl.falloff}}
  name ColorLookup12
  xpos 3920
  ypos 3595
 }
push $N292bd200
 Crop {
  box {{width-ctrl.off} 0 {width x1042 2048} 0}
  reformat true
  crop false
  name Crop12
  xpos 5052
  ypos 3273
  hide_input true
 }
 Reformat {
  type "to box"
  box_width {{FormatReceiver.width}}
  box_height {{FormatReceiver.height}}
  box_fixed true
  resize distort
  name Reformat28
  xpos 5052
  ypos 3299
  postage_stamp true
 }
 Reformat {
  type "to box"
  box_width {{FormatReceiver.width}}
  box_height {{FormatReceiver.height}}
  box_fixed true
  resize distort
  name Reformat29
  xpos 5052
  ypos 3371
 }
push $N292bd200
 Crop {
  box {0 {ctrl.off} 0 {ctrl.off}}
  reformat true
  crop false
  name Crop14
  xpos 3508
  ypos 3220
  hide_input true
 }
 Reformat {
  type "to box"
  box_width {{FormatReceiver.width}}
  box_height {{FormatReceiver.height}}
  box_fixed true
  resize distort
  name Reformat32
  xpos 3508
  ypos 3246
  postage_stamp true
 }
 Reformat {
  type "to box"
  box_width {{FormatReceiver.width}}
  box_height {{FormatReceiver.height}}
  box_fixed true
  resize distort
  name Reformat33
  xpos 3508
  ypos 3318
 }
 Keymix {
  inputs 3
  name Keymix11
  xpos 4145
  ypos 3572
  postage_stamp true
 }
 Keymix {
  inputs 3
  name Keymix12
  xpos 4145
  ypos 2563
  postage_stamp true
 }
push $N9c83be00
 Expression {
  expr3 r
  name Expression11
  xpos -2397
  ypos 2463
  hide_input true
 }
push $N9c83be00
 Expression {
  expr3 min(g*2,1)
  name Expression10
  xpos -1440
  ypos 2559
  hide_input true
 }
 ColorLookup {
  channels alpha
  lut {master {curve C k 0 s0 1 s0}
    red {}
    green {}
    blue {}
    alpha {}}
  mix {{parent.ctrl.falloff}}
  name ColorLookup5
  xpos -1440
  ypos 2585
 }
push $N9c83be00
 Expression {
  expr3 max(0,g*2-1)
  name Expression8
  xpos -1432
  ypos 2401
  hide_input true
 }
 ColorLookup {
  channels alpha
  lut {master {curve C k 0 s0 1 s0}
    red {}
    green {}
    blue {}
    alpha {}}
  mix {{parent.ctrl.falloff}}
  name ColorLookup4
  xpos -1432
  ypos 2427
 }
push $N9c83be00
 Expression {
  expr3 max(0,r*2-1)
  name Expression3
  xpos -2719
  ypos 1785
  hide_input true
 }
 ColorLookup {
  channels alpha
  lut {master {curve C k 0 s0 1 s0}
    red {}
    green {}
    blue {}
    alpha {}}
  mix {{parent.ctrl.falloff}}
  name ColorLookup3
  xpos -2719
  ypos 1811
 }
push $N9c852a00
 Dot {
  name Dot4
  xpos -1359
  ypos 309
 }
set N292c8a00 [stack 0]
 Crop {
  box {{width-ctrl.off x1234 2846} {height-ctrl.off} {width} {height}}
  reformat true
  crop false
  name Crop5
  xpos -1788
  ypos 1521
  hide_input true
 }
 Reformat {
  type "to box"
  box_width {{FormatReceiver.width}}
  box_height {{FormatReceiver.height}}
  box_fixed true
  resize distort
  name Reformat10
  xpos -1788
  ypos 1547
  postage_stamp true
 }
 Reformat {
  type "to box"
  box_width {{FormatReceiver.width}}
  box_height {{FormatReceiver.height}}
  box_fixed true
  resize distort
  name Reformat9
  xpos -1788
  ypos 1619
 }
push $N9c83be00
 Expression {
  expr3 min(r*2,1)
  name Expression2
  xpos -2720
  ypos 1701
  hide_input true
 }
 ColorLookup {
  channels alpha
  lut {master {curve C k 0 s0 1 s0}
    red {}
    green {}
    blue {}
    alpha {}}
  mix {{parent.ctrl.falloff}}
  name ColorLookup2
  xpos -2720
  ypos 1727
 }
push $N292c8a00
 Crop {
  box {{width/2-1} {height-2 x2 115} {width/2+1} {height}}
  reformat true
  crop false
  name Crop4
  xpos -2477
  ypos 1525
  hide_input true
 }
 Reformat {
  type "to box"
  box_width {{FormatReceiver.width}}
  box_height {{FormatReceiver.height}}
  box_fixed true
  resize distort
  name Reformat2
  xpos -2477
  ypos 1551
  postage_stamp true
 }
 Reformat {
  type "to box"
  box_width {{FormatReceiver.width}}
  box_height {{FormatReceiver.height}}
  box_fixed true
  resize distort
  name Reformat18
  xpos -2477
  ypos 1623
 }
push $N292c8a00
 Crop {
  box {0 {height-ctrl.off} {ctrl.off} {height}}
  reformat true
  crop false
  name Crop25
  xpos -3194
  ypos 1483
  hide_input true
 }
 Reformat {
  type "to box"
  box_width {{FormatReceiver.width}}
  box_height {{FormatReceiver.height}}
  box_fixed true
  resize distort
  name Reformat12
  xpos -3194
  ypos 1509
  postage_stamp true
 }
 Reformat {
  type "to box"
  box_width {{FormatReceiver.width}}
  box_height {{FormatReceiver.height}}
  box_fixed true
  resize distort
  name Reformat8
  xpos -3194
  ypos 1588
 }
set N292cd600 [stack 0]
 Keymix {
  inputs 3
  name Keymix1
  xpos -2477
  ypos 1672
  postage_stamp true
 }
 Keymix {
  inputs 3
  name Keymix2
  xpos -2477
  ypos 1756
  postage_stamp true
 }
set N292ce200 [stack 0]
 Dot {
  name Dot18
  xpos -1636
  ypos 1731
 }
push $N292c8a00
 Crop {
  box {{width-1} {height/2-1} {width x2 2048} {height/2+1 x2 577}}
  reformat true
  crop false
  name Crop6
  xpos -1762
  ypos 2231
  hide_input true
 }
 Reformat {
  type "to box"
  box_width {{FormatReceiver.width}}
  box_height {{FormatReceiver.height}}
  box_fixed true
  resize distort
  name Reformat4
  xpos -1762
  ypos 2257
  postage_stamp true
 }
 Reformat {
  type "to box"
  box_width {{FormatReceiver.width}}
  box_height {{FormatReceiver.height}}
  box_fixed true
  resize distort
  name Reformat17
  xpos -1762
  ypos 2338
 }
 Keymix {
  inputs 3
  name Keymix6
  xpos -1670
  ypos 2463
  postage_stamp true
 }
push $N9c83be00
 Expression {
  expr3 max(0,r*2-1)
  name Expression4
  xpos -2273
  ypos 3085
  hide_input true
 }
 ColorLookup {
  channels alpha
  lut {master {curve C k 0 s0 1 s0}
    red {}
    green {}
    blue {}
    alpha {}}
  mix {{parent.ctrl.falloff}}
  name ColorLookup6
  xpos -2273
  ypos 3111
 }
push $N292c8a00
 Crop {
  box {{width-ctrl.off} 0 {width x1042 2048} 0}
  reformat true
  crop false
  name Crop26
  xpos -1638
  ypos 3327
  hide_input true
 }
 Reformat {
  type "to box"
  box_width {{FormatReceiver.width}}
  box_height {{FormatReceiver.height}}
  box_fixed true
  resize distort
  name Reformat13
  xpos -1638
  ypos 3353
  postage_stamp true
 }
 Reformat {
  type "to box"
  box_width {{FormatReceiver.width}}
  box_height {{FormatReceiver.height}}
  box_fixed true
  resize distort
  name Reformat7
  xpos -1638
  ypos 3425
 }
push $N9c83be00
 Expression {
  expr3 min(r*2,1)
  name Expression5
  xpos -2565
  ypos 3083
  hide_input true
 }
 ColorLookup {
  channels alpha
  lut {master {curve C k 0 s0 1 s0}
    red {}
    green {}
    blue {}
    alpha {}}
  mix {{parent.ctrl.falloff}}
  name ColorLookup7
  xpos -2565
  ypos 3109
 }
push $N292c8a00
 Crop {
  box {{width/2-1} 0 {width/2+1} 1}
  reformat true
  crop false
  name Crop8
  xpos -2418
  ypos 3133
  hide_input true
 }
 Reformat {
  type "to box"
  box_width {{FormatReceiver.width}}
  box_height {{FormatReceiver.height}}
  box_fixed true
  resize distort
  name Reformat1
  xpos -2418
  ypos 3159
  postage_stamp true
 }
 Reformat {
  type "to box"
  box_width {{FormatReceiver.width}}
  box_height {{FormatReceiver.height}}
  box_fixed true
  resize distort
  name Reformat11
  xpos -2418
  ypos 3231
 }
push $N292c8a00
 Crop {
  box {0 {ctrl.off} 0 {ctrl.off}}
  reformat true
  crop false
  name Crop27
  xpos -3182
  ypos 3274
  hide_input true
 }
 Reformat {
  type "to box"
  box_width {{FormatReceiver.width}}
  box_height {{FormatReceiver.height}}
  box_fixed true
  resize distort
  name Reformat14
  xpos -3182
  ypos 3300
  postage_stamp true
 }
 Reformat {
  type "to box"
  box_width {{FormatReceiver.width}}
  box_height {{FormatReceiver.height}}
  box_fixed true
  resize distort
  name Reformat6
  xpos -3182
  ypos 3372
 }
 Keymix {
  inputs 3
  name Keymix3
  xpos -2418
  ypos 3294
  postage_stamp true
 }
 Keymix {
  inputs 3
  name Keymix4
  xpos -2418
  ypos 3396
  postage_stamp true
 }
set N292d8200 [stack 0]
 Keymix {
  inputs 3
  name Keymix7
  xpos -1670
  ypos 2547
  postage_stamp true
 }
push $N9c83be00
 Expression {
  expr3 min(g*2,1)
  name Expression6
  xpos -3228
  ypos 2548
  hide_input true
 }
 ColorLookup {
  channels alpha
  lut {master {curve C k 0 s0 1 s0}
    red {}
    green {}
    blue {}
    alpha {}}
  mix {{parent.ctrl.falloff}}
  name ColorLookup8
  xpos -3228
  ypos 2574
 }
push $N9c83be00
 Expression {
  expr3 max(0,g*2-1)
  name Expression9
  xpos -3241
  ypos 2431
  hide_input true
 }
 ColorLookup {
  channels alpha
  lut {master {curve C k 0 s0 1 s0}
    red {}
    green {}
    blue {}
    alpha {}}
  mix {{parent.ctrl.falloff}}
  name ColorLookup9
  xpos -3241
  ypos 2457
 }
push $N292ce200
push $N292c8a00
 Crop {
  box {0 {height/2-1} 1 {height/2+1 x2 49}}
  reformat true
  crop false
  name Crop7
  xpos -3207
  ypos 2265
  hide_input true
 }
 Reformat {
  type "to box"
  box_width {{FormatReceiver.width}}
  box_height {{FormatReceiver.height}}
  box_fixed true
  resize distort
  name Reformat3
  xpos -3207
  ypos 2291
  postage_stamp true
 }
 Reformat {
  type "to box"
  box_width {{FormatReceiver.width}}
  box_height {{FormatReceiver.height}}
  box_fixed true
  resize distort
  name Reformat16
  xpos -3207
  ypos 2363
 }
 Keymix {
  inputs 3
  name Keymix8
  xpos -3088
  ypos 2405
  postage_stamp true
 }
push $N292d8200
 Keymix {
  inputs 3
  name Keymix5
  xpos -3088
  ypos 2547
  postage_stamp true
 }
 Keymix {
  inputs 3
  name Keymix9
  xpos -2397
  ypos 2547
  postage_stamp true
 }
 Switch {
  inputs 3
  which {{ctrl.samples}}
  name Switch1
  xpos 937
  ypos 3446
 }
 Crop {
  box {0 0 3414 2198}
  name Crop1
  xpos 937
  ypos 4935
  disable true
 }
 Reformat {
  type "to box"
  box_width {{FormatReceiver.width}}
  box_height {{FormatReceiver.height}}
  box_fixed true
  box_pixel_aspect {{FormatReceiver.pixel_aspect}}
  resize distort
  name Reformat19
  xpos 937
  ypos 4961
 }
set N292de000 [stack 0]
 Shuffle {
  red black
  green black
  blue black
  alpha white
  name Shuffle6
  xpos 753
  ypos 4993
 }
 Crop {
  box {0 0 {width} {height}}
  name Crop2
  xpos 753
  ypos 5019
 }
push $N292de000
 Copy {
  inputs 2
  from0 rgba.alpha
  to0 rgba.alpha
  name Copy1
  xpos 937
  ypos 4987
 }
 CornerPin2D {
  to1 {{parent.___MainCP_A2.to1} {parent.___MainCP_A2.to1}}
  to2 {{parent.___MainCP_A2.to2} {parent.___MainCP_A2.to2}}
  to3 {{parent.___MainCP_A2.to3} {parent.___MainCP_A2.to3}}
  to4 {{parent.___MainCP_A2.to4} {parent.___MainCP_A2.to4}}
  invert true
  black_outside false
  motionblur 0.04
  shutter 1.45
  from1 {766 484}
  from2 {1228 510}
  from3 {1230 904}
  from4 {728 858}
  name CP_out
  xpos 937
  ypos 5025
 }
 Blur {
  channels rgb
  name BlurPatch
  xpos 937
  ypos 5120
 }
 Blur {
  channels alpha
  name BlurAlpha
  xpos 937
  ypos 5154
 }
 Premult {
  name Premult1
  xpos 937
  ypos 5180
  disable {{1-ctrl.premult}}
 }
 Output {
  name Output1
  xpos 937
  ypos 5280
 }
 NoOp {
  inputs 0
  name ctrl
  xpos -1438
  ypos 210
  addUserKnob {20 User}
  addUserKnob {7 off R 0 500}
  addUserKnob {6 premult +STARTLINE}
  premult true
  addUserKnob {4 samples M {8 4 loads ""}}
  samples loads
  addUserKnob {7 falloff}
  falloff 0.432
  addUserKnob {7 blurAlpha l "bur alpha" R 0 50}
  blurAlpha 50
 }
push $N292cd600
 Dot {
  name Dot7
  xpos -3054
  ypos 1659
 }
 Expression {
  inputs 0
  expr3 y/height<0.5?y/height*2:(1-(y/height))*2
  name Expression27
  xpos 2600
  ypos 2486
 }
 Expression {
  inputs 0
  expr3 x/width<0.5?x/width*2:(1-(x/width))*2
  name Expression26
  xpos 2710
  ypos 2486
 }
 Expression {
  inputs 0
  expr3 y/height<0.5?y/height*2:(1-(y/height))*2
  name Expression24
  xpos 2820
  ypos 2486
 }
 Grade {
  inputs 0
  white 0
  add {1 0 0 0}
  add_panelDropped true
  black_clamp false
  name Grade5
  xpos -1854
  ypos 1663
 }
 Expression {
  inputs 0
  expr3 x/width<=y/height&&x/width>=1-(y/height)||x/width>=y/height&&x/width<=1-(y/height)?(1*y/height*2):0
  name Expression25
  xpos 2488
  ypos 2485
 }
 Constant {
  inputs 0
  channels rgb
  format "512 512 0 0 512 512 1 square_512"
  name Constant1
  xpos 797
  ypos 2038
 }
 Expression {
  expr0 x/width
  expr1 y/height
  name Expression19
  xpos 797
  ypos 2129
 }
 Transform {
  rotate 45
  scale 1.44
  center {256 256}
  shutteroffset centred
  name Transform1
  xpos 797
  ypos 2155
 }
 Grade {
  blackpoint {0.01501464844 0.4960965812 0 1}
  whitepoint {0.9836945534 0.498046875 0 1}
  black_clamp false
  name Grade6
  xpos 811
  ypos 2187
  disable true
 }
push $N9c852a00
 Crop {
  box {0 {height-1} {width x1043 3414} {height x1043 12197}}
  crop false
  name Crop18
  xpos 1854
  ypos -104
  hide_input true
  postage_stamp true
 }
 Grade {
  white 0
  add {0 1 0 0}
  add_panelDropped true
  black_clamp false
  name Grade9
  xpos 1854
  ypos -32
  postage_stamp true
 }
push $N9c852a00
 Crop {
  box {{0 x1043 3413} 0 1 {height}}
  crop false
  name Crop17
  xpos 1488
  ypos 263
  hide_input true
  postage_stamp true
 }
 Grade {
  white 0
  add {1 0 0 0}
  add_panelDropped true
  black_clamp false
  name Grade8
  xpos 1488
  ypos 335
  postage_stamp true
 }
 Expression {
  inputs 0
  expr0 (x/width+y/height)/2
  expr1 (x/width+y/height)/2
  expr2 (x/width+y/height)/2
  expr3 (x/width+y/height)/2
  name Expression21
  xpos 2419
  ypos 604
  postage_stamp true
 }
push $N9c852a00
 Crop {
  box {0 0 {width} 1}
  crop false
  name Crop19
  xpos 1871
  ypos 676
  hide_input true
  postage_stamp true
 }
 Grade {
  white 0
  add {-1 1 1 0}
  add_panelDropped true
  black_clamp false
  name Grade10
  xpos 1871
  ypos 604
  postage_stamp true
 }
push $N9c852a00
 Crop {
  box {{width-1 x1043 3413} 0 {width} {height}}
  crop false
  name Crop16
  xpos 2206
  ypos 238
  hide_input true
  postage_stamp true
 }
 Grade {
  white 0
  add {0 0 1 0}
  add_panelDropped true
  black_clamp false
  name Grade7
  xpos 2206
  ypos 310
  postage_stamp true
 }
 Keymix {
  inputs 3
  name Keymix19
  xpos 2206
  ypos 598
  postage_stamp true
 }
 Expression {
  inputs 0
  expr0 (x/width+y/height)/2
  expr1 (x/width+y/height)/2
  expr2 (x/width+y/height)/2
  expr3 (x/width+y/height)/2
  name Expression29
  xpos 3052
  ypos 46
  postage_stamp true
 }
 Expression {
  inputs 0
  expr0 y/height
  expr1 y/height
  expr2 y/height
  expr3 y/height
  name Expression30
  xpos 2576
  ypos 904
  postage_stamp true
 }
set N9c9bac00 [stack 0]
 Mirror2 {
  flip true
  name Mirror2_6
  xpos 2466
  ypos 1021
 }
push $N9c9bac00
 Merge2 {
  inputs 2
  operation multiply
  name Merge6
  xpos 2576
  ypos 1021
 }
 Grade {
  channels all
  white 4
  black_clamp false
  name Grade14
  xpos 2576
  ypos 1047
 }
 Expression {
  inputs 0
  expr0 x/width
  expr1 x/width
  expr2 x/width
  expr3 x/width
  name Expression22
  xpos 2349
  ypos 990
  postage_stamp true
 }
set N9c9bee00 [stack 0]
 Mirror2 {
  flop true
  name Mirror2_5
  xpos 2239
  ypos 1107
 }
push $N9c9bee00
 Merge2 {
  inputs 2
  operation multiply
  name Merge5
  xpos 2349
  ypos 1107
 }
 Grade {
  channels all
  white 4
  black_clamp false
  name Grade13
  xpos 2349
  ypos 1133
 }
 Merge2 {
  inputs 2
  operation multiply
  name Merge4
  xpos 2576
  ypos 1116
  postage_stamp true
 }
 Expression {
  inputs 0
  expr0 x/width
  expr1 x/width
  expr2 x/width
  expr3 x/width
  name Expression31
  xpos 1011
  ypos 671
  postage_stamp true
 }
 Expression {
  inputs 0
  expr0 y/height
  expr1 y/height
  expr2 y/height
  expr3 y/height
  name Expression28
  xpos 1252
  ypos 802
  postage_stamp true
 }
 Expression {
  inputs 0
  expr0 y/height
  expr1 y/height
  expr2 y/height
  expr3 y/height
  name Expression32
  xpos 1719
  ypos 355
  postage_stamp true
 }
 Reformat {
  inputs 0
  type scale
  turn true
  name Reformat15
  xpos 1438
  ypos 536
  postage_stamp true
 }
 Expression {
  inputs 0
  expr0 (x/width+y/height)/2
  expr1 (x/width+y/height)/2
  expr2 (x/width+y/height)/2
  expr3 (x/width+y/height)/2
  name Expression20
  xpos 1267
  ypos 537
  postage_stamp true
 }
set N9c9c5000 [stack 0]
 Mirror2 {
  flip true
  name Mirror2_3
  xpos 1211
  ypos 651
 }
push $N9c9c5000
 Merge2 {
  inputs 2
  operation multiply
  name Merge2
  xpos 1321
  ypos 651
 }
 Constant {
  inputs 0
  channels alpha
  color 1
  format "3414 2198 0 0 3414 2198 2 "
  name Constant4
  xpos 750
  ypos 4812
 }
push $N2920d200
push 0
push 0
push 0
push 0
push 0
push 0
push 0
push $N29042600
push $N9c914000
 Viewer {
  inputs 10
  frame_range 1-100
  colour_sample_bbox {-0.0234375 0.20703125 -0.021484375 0.208984375}
  input_process false
  monitorOutNDISenderName "NukeX - temp - Viewer1"
  monitorOutOutputTransform rec709
  name Viewer1
  xpos -1294
  ypos 478
  hide_input true
 }
end_group


```
{% endraw %}