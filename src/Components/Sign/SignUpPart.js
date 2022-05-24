import React, { useEffect, useState,useRef } from 'react';
import ResponsiveDatePickers from '../SameLayout/DatePicker';
import { useNavigate} from 'react-router'; 
import axios from "axios";
import SignPartModal from "./SignPartModal"

function SignUpPart(){

    const navigate = useNavigate();
    const modalRef=useRef();
    

    let [id, changeId] = useState("");
    let [password, changePassword] = useState("");
    let [name, changeName] = useState("");
    let [gender, changeGender] = useState("");
    let [email, changeEmail] = useState("");
    let [birth, changeBirth] = useState("");

    let [what_to_modal,set_what_to_modal]=useState("wrong_signup");//디폴트로는 회원가입

    const [key_for_security,set_key_for_security]=useState("less_than_6");//보안수준 보여주기 위한 키값
    const [key_for_same,set_key_for_same]=useState("");//같은지 다른지 여부

    const ShowWrongInfo=(wrong_message)=>{//모달창 보여주기
        set_what_to_modal(wrong_message);
        modalRef.current.click();
      }
  
     const checkOnlyOne = (e) => {//체크박스 하나만 체크해주기
        const checkboxes = document.getElementsByName('sex')
        for (let i = 0; i < checkboxes.length; i++) {
          if (checkboxes[i] !== e.target) {
            checkboxes[i].checked = false
          }
        }
        changeGender(e.target.value);
      }

    const signUpBTNClick = (e) => {//회원가입 정보 보내주기
        e.preventDefault();

        console.log(id, password, name, gender, email, birth);
        if(id===""||password===""||name===""||gender===""||email===""||birth===""){
            ShowWrongInfo("empty_value");//값이 비어있으면 다시 채우라고 알림-빈값 오류
            return;
        }
        axios.post("http://127.0.0.1:8000/user/signup", {
            id : id,
            password : password,
            name : name,
            gender : gender,
            email : email,
            birth : birth,
        })
        .then(res => {
            console.log(res.data);
            //axios.defaults.headers.common['Authorization'] = `token ${res.payload.accessToken}`
            navigate('/account/signIn');
        })
        .catch(err => {
            console.log(err.response.data);
            if(err.response.data.error==="이미 존재하는 아이디입니다"){
                ShowWrongInfo("exist_id");
            }
        }
            
            
        )
    }

    const AnalyzePasswordSecurityLevel=(password)=> {//정규식으로 비밀번호 암호수준 체크
        var securityLevelFlag = 0;
        if (password.length < 6) {//비밀번호 6글자 이하일 경우
            set_key_for_security("less_than_6");
        }
        else {
            if (/[a-z]/.test(password)){
                securityLevelFlag++;    //lowercase
            }
            if (/[A-Z]/.test(password)){
                securityLevelFlag++;    //uppercase
            } 
            if(/[0-9]/.test(password)){
                securityLevelFlag++;    //digital
            }
            if(containSpecialChar(password)){
                securityLevelFlag++;    //specialcase
            }

            if(securityLevelFlag===0){//6글자 이하임
                set_key_for_security("less_than_6");
            }
            else if(securityLevelFlag===1){//매우 낮음
                set_key_for_security("very_low");
            }
            else if(securityLevelFlag===2){//낮음
                set_key_for_security("low");
            }
            else if(securityLevelFlag===3){//적절함
                set_key_for_security("proper");
            }
            else{//안전함
                set_key_for_security("safe")
            }
        }
    }
    
    const containSpecialChar=(str)=>   //정규식으로 체크
    {   
        var containSpecial = RegExp(/[(\ )(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\<)(\>)(\?)(\)]+/);
        return (containSpecial.test(str));   
    }

    const security_content={
        very_low:{
            message:"매우위험함",
            css:"text-danger"
        },
        low:{
            message:"위험함",
            css:"text-warning"
        },
        proper:{
            message:"보통임",
            css:"text-info"
        },
        safe:{
            message:"안전함",
            css:"text-success"
        },
        less_than_6:{
            message:"6자리이하입니다",
            css:"text-warning"
        }
    }

    const AboutSame={
        different:{
            message:"비밀번호가 서로 다릅니다",
            css:"text-warning"
        },
        same:{
            message:"일치합니다",
            css:"text-success"
        }
    }

    const checkSame=(e)=>{
        if(password===e.target.value){
            set_key_for_same("same")
        }
        else{
            set_key_for_same("different");
        }
    }

    return (

        <div>
        {/* Page content */}
            <div className="container mt--8 pb-5">
            {/* Table */}
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-8">
                <div className="card bg-secondary_ shadow_ border-0">
                    <div className="card-body px-lg-5 py-lg-5">
                    <form role="form">
                        <div className="form-group">
                        <div className="input-group input-group-alternative mb-3">
                            <div className="input-group-prepend">
                            <span className="input-group-text"><i className="ni ni-single-02" /></span>
                            </div>
                            <input className="form-control" placeholder="아이디" type="text" onChange={(e) => {
                                changeId(e.target.value);
                            }}/>
                        </div>
                        </div>
                        {
                            key_for_security===""
                            ?
                            null
                            :
                            <div className="text-muted font-italic"><small>보안수준: <span className={security_content[key_for_security].css+" font-weight-700"}>{security_content[key_for_security].message}</span></small></div>
                        }
                       
                        <div className="form-group">
                        <div className="input-group input-group-alternative">
                            <div className="input-group-prepend">
                            <span className="input-group-text"><i className="ni ni-lock-circle-open" /></span>
                            </div>
                            <input className="form-control" placeholder="패스워드" type="password" onChange={(e) => {
                                changePassword(e.target.value);
                                AnalyzePasswordSecurityLevel(e.target.value);
                            }}/>
                        </div>
                        </div>

                        {
                            key_for_same===""
                            ?
                                null
                            :
                            <div className="text-muted font-italic"><small><span className={AboutSame[key_for_same].css+" font-weight-700"}>{AboutSame[key_for_same].message}</span></small></div>
                        }
                        <div className="form-group">
                        <div className="input-group input-group-alternative">
                            <div className="input-group-prepend">
                            <span className="input-group-text"><i className="ni ni-lock-circle-open" /></span>
                            </div>
                            <input className="form-control" placeholder="패스워드확인" type="password" onChange={checkSame}/>
                        </div>
                        </div>
                        <div className="form-group">
                        <div className="input-group input-group-alternative mb-3">
                            <div className="input-group-prepend">
                            <span className="input-group-text"><i className="ni ni-circle-08" /></span>
                            </div>
                            <input className="form-control" placeholder="이름" type="email" onChange={(e) => {
                                changeName(e.target.value);
                            }}/>
                        </div>
                        </div>
                        <div className="form-group">
                        <div className="input-group input-group-alternative mb-3">
                            <div className="input-group-prepend">
                            <span className="input-group-text"><i className="ni ni-email-83" /></span>
                            </div>
                            <input className="form-control" placeholder="이메일" type="email" onChange={(e) => {
                                changeEmail(e.target.value);
                            }}/>
                        </div>
                        </div>
                        <div className="row my-4">
                            <div className="col-12" style={{display:"flex",justifyContent:"space-evenly"}}>
                                <div className="custom-control custom-control-alternative custom-checkbox sex_">
                                <input name='sex' className="custom-control-input" id="man" value="man" type="checkbox" onChange={checkOnlyOne}/>
                                <label className="custom-control-label seperator_" htmlFor="man">
                                    <span className="text-muted">남자</span>
                                </label>
                                </div>
                                <div className="custom-control custom-control-alternative custom-checkbox sex_ ">
                                <input  name='sex' className="custom-control-input" id="woman" value="woman" type="checkbox" onChange={checkOnlyOne}/>
                                <label className="custom-control-label" htmlFor="woman">
                                    <span className="text-muted">여자</span>
                                </label>
                                </div>
                            </div>
                        </div>
                        <ResponsiveDatePickers changeBirth={changeBirth}/>
                    </form>
                    
                    <div className="text-center_">
                        <button type="button" className="btn btn-primary mt-4" onClick={signUpBTNClick}>💪PT등록하기</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>

            <button ref={modalRef} style={{display:"none"}} type="button" className="btn btn-block btn-primary mb-3" data-toggle="modal" data-target="#modal-show-Wrong-signup">Default</button>
            <SignPartModal which_error={what_to_modal}/>

        </div>
      );
}
export default SignUpPart