contextSensitive := false
#Include ..\..\..\..\Engine - Keyboard.ahk
InitScript:
global maxMaps := 3
return

Label_up_down:
HKPre()
SendEvent {blind}{up downtemp}
HKPost()
return
Label_up_up:
HKUpPre()
SendEvent {blind}{up up}
HKUpPost()
return

Label_down_down:
HKPre()
SendEvent {blind}{down downtemp}
HKPost()
return
Label_down_up:
HKUpPre()
SendEvent {blind}{down up}
HKUpPost()
return

Label_left_down:
HKPre()
SendEvent {blind}{left downtemp}
HKPost()
return
Label_left_up:
HKUpPre()
SendEvent {blind}{left up}
HKUpPost()
return

Label_right_down:
HKPre()
SendEvent {blind}{right downtemp}
HKPost()
return
Label_right_up:
HKUpPre()
SendEvent {blind}{right up}
HKUpPost()
return

Label_1_down:
HKPre()
SendEvent {blind}{f10 downtemp}
HKPost()
return
Label_1_up:
HKUpPre()
SendEvent {blind}{f10 up}
HKUpPost()
return

Label_f_down:
HKPre()
SendEvent {blind}{a downtemp}
HKPost()
return
Label_f_up:
HKUpPre()
SendEvent {blind}{a up}
HKUpPost()
return

Label_d_down:
HKPre()
SendEvent {blind}{s downtemp}
HKPost()
return
Label_d_up:
HKUpPre()
SendEvent {blind}{s up}
HKUpPost()
return

Label_8_down:
MKPre()
SwitchKeymap(2)
MKPost()
return
Label_8_up:
MKUpPre()
SwitchKeymap(1)
MKUpPost()
return

Label_0_down:
MKPre()
SwitchKeymap(3)
MKPost()
return
Label_0_up:
MKUpPre()
SwitchKeymap(1)
MKUpPost()
return

Label_i_down:
HKPre()
SendEvent {blind}{lshift downtemp}
HKPost()
return
Label_i_up:
HKUpPre()
SendEvent {blind}{lshift up}
HKUpPost()
return

Label_u_down:
HKPre()
SendEvent {blind}{lctrl downtemp}
HKPost()
return
Label_u_up:
HKUpPre()
SendEvent {blind}{lctrl up}
HKUpPost()
return

Label_j_down:
HKPre()
SendEvent {blind}{lshift downtemp}
HKPost()
return
Label_j_up:
HKUpPre()
SendEvent {blind}{lshift up}
HKUpPost()
return

Label_m_down:
HKPre()
SendEvent {blind}{lalt downtemp}
HKPost()
return
Label_m_up:
HKUpPre()
SendEvent {blind}{lalt up}
HKUpPost()
return

LabelMap2_a_down:
HKPre()
SendEvent {blind}{1 downtemp}
HKPost()
return
LabelMap2_a_up:
HKUpPre()
SendEvent {blind}{1 up}
HKUpPost()
return

LabelMap2_s_down:
HKPre()
SendEvent {blind}{2 downtemp}
HKPost()
return
LabelMap2_s_up:
HKUpPre()
SendEvent {blind}{2 up}
HKUpPost()
return

LabelMap2_d_down:
HKPre()
SendEvent {blind}{3 downtemp}
HKPost()
return
LabelMap2_d_up:
HKUpPre()
SendEvent {blind}{3 up}
HKUpPost()
return

LabelMap2_f_down:
HKPre()
SendEvent {blind}{4 downtemp}
HKPost()
return
LabelMap2_f_up:
HKUpPre()
SendEvent {blind}{4 up}
HKUpPost()
return

LabelMap2_g_down:
HKPre()
SendEvent {blind}{5 downtemp}
HKPost()
return
LabelMap2_g_up:
HKUpPre()
SendEvent {blind}{5 up}
HKUpPost()
return

LabelMap2_q_down:
HKPre()
SendEvent {blind}{lshift downtemp}
SendEvent {blind}{1 downtemp}
HKPost()
return
LabelMap2_q_up:
HKUpPre()
SendEvent {blind}{1 up}
SendEvent {blind}{lshift up}
HKUpPost()
return

LabelMap2_w_down:
HKPre()
SendEvent {blind}{lshift downtemp}
SendEvent {blind}{2 downtemp}
HKPost()
return
LabelMap2_w_up:
HKUpPre()
SendEvent {blind}{2 up}
SendEvent {blind}{lshift up}
HKUpPost()
return

LabelMap2_e_down:
HKPre()
SendEvent {blind}{lshift downtemp}
SendEvent {blind}{3 downtemp}
HKPost()
return
LabelMap2_e_up:
HKUpPre()
SendEvent {blind}{3 up}
SendEvent {blind}{lshift up}
HKUpPost()
return

LabelMap2_r_down:
HKPre()
SendEvent {blind}{lshift downtemp}
SendEvent {blind}{4 downtemp}
HKPost()
return
LabelMap2_r_up:
HKUpPre()
SendEvent {blind}{4 up}
SendEvent {blind}{lshift up}
HKUpPost()
return

LabelMap2_t_down:
HKPre()
SendEvent {blind}{lshift downtemp}
SendEvent {blind}{5 downtemp}
HKPost()
return
LabelMap2_t_up:
HKUpPre()
SendEvent {blind}{5 up}
SendEvent {blind}{lshift up}
HKUpPost()
return

LabelMap2_z_down:
HKPre()
SendEvent {blind}{lctrl downtemp}
SendEvent {blind}{1 downtemp}
HKPost()
return
LabelMap2_z_up:
HKUpPre()
SendEvent {blind}{1 up}
SendEvent {blind}{lctrl up}
HKUpPost()
return

LabelMap2_x_down:
HKPre()
SendEvent {blind}{lctrl downtemp}
SendEvent {blind}{2 downtemp}
HKPost()
return
LabelMap2_x_up:
HKUpPre()
SendEvent {blind}{2 up}
SendEvent {blind}{lctrl up}
HKUpPost()
return

LabelMap2_c_down:
HKPre()
SendEvent {blind}{lctrl downtemp}
SendEvent {blind}{3 downtemp}
HKPost()
return
LabelMap2_c_up:
HKUpPre()
SendEvent {blind}{3 up}
SendEvent {blind}{lctrl up}
HKUpPost()
return

LabelMap2_v_down:
HKPre()
SendEvent {blind}{lctrl downtemp}
SendEvent {blind}{4 downtemp}
HKPost()
return
LabelMap2_v_up:
HKUpPre()
SendEvent {blind}{4 up}
SendEvent {blind}{lctrl up}
HKUpPost()
return

LabelMap2_b_down:
HKPre()
SendEvent {blind}{lctrl downtemp}
SendEvent {blind}{5 downtemp}
HKPost()
return
LabelMap2_b_up:
HKUpPre()
SendEvent {blind}{5 up}
SendEvent {blind}{lctrl up}
HKUpPost()
return

LabelMap3_f_down:
HKPre()
SendEvent {blind}{f downtemp}
HKPost()
return
LabelMap3_f_up:
HKUpPre()
SendEvent {blind}{f up}
HKUpPost()
return

LabelMap3_d_down:
HKPre()
SendEvent {blind}{e downtemp}
HKPost()
return
LabelMap3_d_up:
HKUpPre()
SendEvent {blind}{e up}
HKUpPost()
return

LabelMap3_4_down:
HKPre()
SendEvent {blind}{b downtemp}
HKPost()
return
LabelMap3_4_up:
HKUpPre()
SendEvent {blind}{b up}
HKUpPost()
return

LabelMap3_2_down:
HKPre()
SendEvent {blind}{a downtemp}
HKPost()
return
LabelMap3_2_up:
HKUpPre()
SendEvent {blind}{a up}
HKUpPost()
return

LabelMap3_3_down:
HKPre()
SendEvent {blind}{s downtemp}
HKPost()
return
LabelMap3_3_up:
HKUpPre()
SendEvent {blind}{s up}
HKUpPost()
return

LabelMap3_5_down:
HKPre()
SendEvent {blind}{s downtemp}
HKPost()
return
LabelMap3_5_up:
HKUpPre()
SendEvent {blind}{s up}
HKUpPost()
return

LabelMap3_1_down:
HKPre()
SendEvent {blind}{d downtemp}
HKPost()
return
LabelMap3_1_up:
HKUpPre()
SendEvent {blind}{d up}
HKUpPost()
return

LabelMap3_r_down:
HKPre()
SendEvent {blind}{g downtemp}
HKPost()
return
LabelMap3_r_up:
HKUpPre()
SendEvent {blind}{g up}
HKUpPost()
return

LabelMap3_w_down:
HKPre()
SendEvent {blind}{m downtemp}
HKPost()
return
LabelMap3_w_up:
HKUpPre()
SendEvent {blind}{m up}
HKUpPost()
return

LabelMap3_e_down:
HKPre()
SendEvent {blind}{n downtemp}
HKPost()
return
LabelMap3_e_up:
HKUpPre()
SendEvent {blind}{n up}
HKUpPost()
return

LabelMap3_a_down:
HKPre()
SendEvent {blind}{w downtemp}
HKPost()
return
LabelMap3_a_up:
HKUpPre()
SendEvent {blind}{w up}
HKUpPost()
return

LabelMap3_x_down:
HKPre()
SendEvent {blind}{x downtemp}
HKPost()
return
LabelMap3_x_up:
HKUpPre()
SendEvent {blind}{x up}
HKUpPost()
return

LabelMap3_z_down:
HKPre()
SendEvent {blind}{z downtemp}
HKPost()
return
LabelMap3_z_up:
HKUpPre()
SendEvent {blind}{z up}
HKUpPost()
return

LabelMap3_t_down:
HKPre()
SendEvent {blind}{t downtemp}
HKPost()
return
LabelMap3_t_up:
HKUpPre()
SendEvent {blind}{t up}
HKUpPost()
return

LabelMap3_g_down:
HKPre()
SendEvent {blind}{p downtemp}
HKPost()
return
LabelMap3_g_up:
HKUpPre()
SendEvent {blind}{p up}
HKUpPost()
return

LabelMap3_q_down:
HKPre()
SendEvent {blind}{r downtemp}
HKPost()
return
LabelMap3_q_up:
HKUpPre()
SendEvent {blind}{r up}
HKUpPost()
return

