import React from 'react';
import CardGraph from './CardGraph';
import CardStickGraph from './CardStickGraph';
import Footer from '../SameLayout/Footer';
class GraphAndShowDataPart extends React.Component{
    render(){
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
}
export default GraphAndShowDataPart;