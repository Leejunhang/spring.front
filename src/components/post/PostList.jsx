import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Spinner, Table, Row, Col, Button } from 'react-bootstrap'
import '../Pagination.css'
import Pagination from 'react-js-pagination'

const PostList = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    const getList = async() => {
        setLoading(true);
        const res= await axios(`/posts/list1.json?page=1&size=5&key=title&query=`);
        //console.log(res.data);
        setList(res.data);
        const res1= await axios(`/posts/total?key=title&query=`);
        setTotal(res1.data);
        setLoading(false);
    }

    useEffect(()=>{
        getList();
    }, []);

    if (loading) return <div className='my-5 text-center'><Spinner variant='primary' /></div>
    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>게시글</h1>
            <Row className='mb-2'>
                <Col>
                    <span>게시글수:{total}건</span>
                </Col>
            </Row>
            <Table striped bordered hover>
                <thead>
                    <tr className='text-center'>
                        <td>ID</td><td>제목</td><td>작성자</td>
                        <td>작성일</td><td>조회수</td><td>댓글수</td>
                    </tr>
                </thead>
                <tbody>
                    {list.map(post =>
                        <tr key={post.pid} className='text-center'>
                            <td>{post.pid}</td><td>{post.title}</td><td>{post.writer}</td>
                            <td>{post.fmtdate}</td><td>{post.viewcnt}</td><td>{post.comcnt}</td>
                        </tr>
                        )}
                </tbody>
            </Table>
            <Pagination
                activePage={1}
                itemsCountPerPage={5}
                totalItemsCount={total}
                pageRangeDisplayed={5}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={()=>{}}/>       
        </div>
    )
}

export default PostList