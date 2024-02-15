import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { getStuByIdApi, deleteStuByIdApi } from "../api/stuApi.js"

/**
 * 学生详情组件
 * @param {*} props 
 * @returns 
 */
function Detail(props) {

    // 获取动态参数传递过来的学生 id
    const { id } = useParams();

    const [stu, setStu] = useState({
        name : "",
        age : "",
        phone : "",
        email : "",
        education : "",
        graduationschool : "",
        profession : "",
        profile : "",
    });

    const navigate = useNavigate();

    // 根据该 id 获取该学生的详细信息
    useEffect(() => {
        getStuByIdApi(id).then(({ data }) => {
            setStu(data);
        });
    }, [id])


    function deleteStu(id){
        if(window.confirm("你是否要删除此学生？")){
            deleteStuByIdApi(id).then(()=>{
                navigate("/home", {
                    state : {
                        alert : "学生删除成功",
                        type : "info"
                    }
                })
            })
        }
    }

    return (
        <div className="details container">
            <button className="btn btn-default" onClick={() => navigate("/home")}>戻る</button>
            <h1 className="page-header">
                {stu.name}
                <span className="pull-right">
                    <button className="btn btn-primary" onClick={() => navigate(`/edit/${stu.id}`)} style={{ marginRight: 10 }}>編集</button>
                    <button className="btn btn-danger" onClick={() => deleteStu(stu.id)}>削除</button>
                </span>
            </h1>
       
            <ul className="list-group">
                <li className="list-group-item">
                    <span className="glyphicon glyphicon-phone">電話番号：{stu.phone}</span>
                </li>
                <li className="list-group-item">
                    <span className="glyphicon glyphicon-envelope">メールアドレス：{stu.email}</span>
                </li>
            </ul>
        
            <ul className="list-group">
                <li className="list-group-item">
                    <span className="glyphicon glyphicon-book">学歴：{stu.education}</span>
                </li>
                <li className="list-group-item">
                    <span className="glyphicon glyphicon-flag">卒業大学：{stu.graduationschool}</span>
                </li>
                <li className="list-group-item">
                    <span className="glyphicon glyphicon-briefcase">専門：{stu.profession}</span>
                </li>
                <li className="list-group-item">
                    <span className="glyphicon glyphicon-user">自己PR：{stu.profile}</span>
                </li>
            </ul>
        </div>
    );
}

export default Detail;