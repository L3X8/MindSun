import { fondo, tema } from "../App";

function Share({numero, descripcion , uni, verificado}){
    return(
      <div style={{background:"black" ,padding:"14px", borderRadius:"50px"}}>
       

       <div id="post">

        <div style={{display:"flex", alignItems:"center" , justifyContent:"space-between"}}>
          <div style={{display:"flex"}}>
              <h1>De {numero}</h1>
            
              {verificado ? <img width="24px" height="24px" src="verifi.gif" alt="" />: <></> }
              <h1>:</h1>    
           </div>
                        <img width="90px" src= {uni == 1 ? "autonomaLogo.png" : uni ==2 ? "utpLogo.png" : ""} alt="" />
                  

        </div>
        
              <p>{descripcion}</p>
            </div>
            <div className="espaciado">
               <img src="/anonimix.png" width={"110px"} alt="anonihub" />
               <p style={{margin:"0px"}}>anonihub.web.app</p>
            </div>
            
      </div>
      
    )
  }

  export default Share;