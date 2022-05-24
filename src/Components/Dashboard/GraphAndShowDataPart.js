import React, { useEffect } from 'react';
import CardGraph from './CardGraph';
import CardStickGraph from './CardStickGraph';
import Footer from '../SameLayout/Footer';
function GraphAndShowDataPart(){


        return(
        <div className="container-fluid mt--7" data-component="GraphAndShowDataPart">
            <div className="row">
              <CardGraph/>
              <CardStickGraph/>
            </div>
            <Footer/>
        </div>
        );
    
}
export default GraphAndShowDataPart;