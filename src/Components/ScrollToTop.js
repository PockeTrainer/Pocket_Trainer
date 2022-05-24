import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    let y_result;

    if(pathname.includes("/routine/weightcheck/practice")||pathname.includes("/routine/exercise")||pathname.includes("/test/pushup")||pathname.includes("/test/situp")||pathname.includes("/test/squat")){
      let rem_size=getComputedStyle(document.documentElement).fontSize;
      y_result=parseInt(rem_size);
    }
    else{
      y_result=0;
    }

    window.scrollTo(0,y_result);
  }, [pathname]);

  return null;
}