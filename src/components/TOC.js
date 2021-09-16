import React, { Component } from 'react';

//목차
class TOC extends Component {
    // true면 render 호출, false면 호출X
    // 새로운 값(newProps.data), 이전 값(this.props.data)에 접근 가능
    shouldComponentUpdate(newProps, newState) {
        if (this.props.data === newProps.data) {
            return false;
        }
        return true;
    }
    render() {
        var lists = [];
        var data = this.props.data;
        var i = 0;
        while(i<data.length) {
            lists.push(<li key={data[i].id}>
                <a href={"/content/"+data[i].id}
                //data-id={data[i].id}
                onClick={function(id, e){ 
                    e.preventDefault();
                    this.props.onChangePage(id);
                }.bind(this, data[i].id)}
                >{data[i].title}</a>
            </li>);
            i += 1;
        }
        return (
        <nav>
            <ul>
                {lists}
            </ul>
        </nav>
        );
    }
}

// 외부에서 사용 가능
export default TOC;