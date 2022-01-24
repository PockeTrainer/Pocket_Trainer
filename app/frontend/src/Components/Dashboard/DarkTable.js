import React from 'react';

class DarkTable extends React.Component{
    render(){
        return(
           
      <div className="col">
        <div className="card bg-default shadow">
          <div className="card-header bg-transparent border-0">
            <h3 className="text-white mb-0"><i className="fab fa-youtube fa-spin" style={{color:"red"}}></i>NEW운동유튜브영상추천</h3>
          </div>
          <div className="table-responsive">
            <table className="table align-items-center table-dark table-flush">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">유튜버명</th>
                  <th scope="col">부위</th>
                  <th scope="col">제목</th>
                  <th scope="col">조회수</th>
                  <th scope="col">옵션</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <div className="media align-items-center">
                      <a href="#" className="avatar rounded-circle mr-3">
                        <img alt="Image placeholder" src="../assets/img/brand/말왕.jpg" />
                      </a>
                      <div className="media-body">
                        <span className="mb-0 text-sm">말왕</span>
                      </div>
                    </div>
                  </th>
                  <td>
                  어깨운동
                  </td>
                  <td>
                    <span className="badge badge-dot mr-4">
                      <i className="bg-warning" /><a href="https://www.youtube.com/watch?v=fzGCXoyVwS4">8x8 볼륨 미쳤네요;; 다음 날...</a>
                    </span>
                  </td>
                  <td>
                    69만회
                  </td>
                  
                  <td className="text-right">
                    <div className="dropdown">
                      <a className="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-ellipsis-v" />메뉴
                      </a>
                      <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                        <a className="dropdown-item" href="#"><i class="fab fa-youtube"></i>보러가기</a>
                        <a className="dropdown-item" href="#"><i class="far fa-copy"></i>링크복사</a>
                        <a className="dropdown-item" href="#"><i class="fas fa-map-pin"></i>내 운동목록채널에 저장</a>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <div className="media align-items-center">
                      <a href="#" className="avatar rounded-circle mr-3">
                        <img alt="Image placeholder" src="../assets/img/brand/운지기.jpg" />
                      </a>
                      <div className="media-body">
                        <span className="mb-0 text-sm">운지기</span>
                      </div>
                    </div>
                  </th>
                  <td>
                    가슴운동
                  </td>
                  <td>
                    <span className="badge badge-dot">
                      <i className="bg-success" />8년동안 계속한 지기의 가슴루틴...
                    </span>
                  </td>
                  <td>
                    36만회
                  </td>
                  <td className="text-right">
                    <div className="dropdown">
                      <a className="btn btn-sm btn-icon-only text-light" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i className="fas fa-ellipsis-v" />메뉴
                      </a>
                      <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                      </div>
                    </div>
                  </td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </div>
      </div> 
        );
    }
}
export default DarkTable;