import { React, useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import SearchMulti from '../components/SearchMulti';
import SearchCont from '../components/SearchCont';
import { useLocation } from 'react-router-dom';

const apiKey = process.env.REACT_APP_API_KEY;

const SearchBlock = styled.div`

`

const WrapSearchContent = styled.div`
    display: flex;
    margin: 1.5rem 4rem;
    overflow-x: scroll;
    ::-webkit-scrollbar {
    display: none; 
    }
`

const SearchResult = styled.div`
    margin-top: 4rem;
    padding-top: 1rem;
    padding-left: 3.5rem;
    padding-bottom: 1rem;
    font-weight: bold;
    color: #74747A;
    background-color: #F7F7F7;
`

const SearchCategory = styled.div`
    display: flex;
    margin-left: 4rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    color: #7A7A7F;
`

const Category = styled.div`
    margin-right: 2rem;
    margin-left: 1rem;
`

const WrapContent = styled.div`
    margin-left: 4rem;
    margin-bottom: 2rem;
    max-height: 30.5rem;
    display: flex;
    flex-wrap: wrap;
    overflow-x: scroll;
    flex-direction: column;
    ::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라, 엣지 */}
`

const WrapTitle = styled.div`
    display: flex;
    margin-left: 4rem;
`

const MoreOption = styled.div`
    padding-right: 1.5rem;
    margin-left: auto;
`

const Search = () => {
    const location = useLocation();
    const searchValue = location.state.search;

    const [searchCont, setSearchCont] = useState([]);
    const [searchMovie, setSerchMovie] = useState([]);
    const [searchTv, setSearchTv] = useState([]);

    useEffect(() => {
        axios
            .get(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=ko-KR&page=1&include_adult=false`, {
                params: {
                    query: searchValue,
                },
            })
            .then((res) => {
                setSearchCont(res.data.results);
            })
    }, [searchValue]);

    useEffect(() => {
        axios
            .get(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=ko-KR&page=1&include_adult=false`, {
                params: {
                    query: searchValue,
                },
            })
            .then((res) => {
                setSerchMovie(res.data.results);
            })
    }, [searchValue]);

    useEffect(() => {
        axios
            .get(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&language=ko-KR&page=1&include_adult=false`, {
                params: {
                    query: searchValue,
                },
            })
            .then((res) => {
                setSearchTv(res.data.results);
            })
    }, [searchValue]);

    console.log(searchCont);

    return (
        <SearchBlock>
            <SearchResult>"{searchValue}"의 검색결과</SearchResult>
            <SearchCategory>
                <Category>
                    콘텐츠
                </Category>
                <Category>
                    인물
                </Category>
                <Category>
                    컬렉션
                </Category></SearchCategory>
            <div style={{ height: "1px", margin: "0 4rem", backgroundColor: "#00000020" }} />
            <WrapSearchContent>
                {searchCont && searchCont.map((s, index) => (
                    <SearchMulti multi={s} key={index} />
                ))}
            </WrapSearchContent>
            <div style={{ height: "1px", margin: "0 4rem", backgroundColor: "#00000020" }} />
            <WrapTitle>
                <h3>영화</h3>
                <MoreOption style={{ textDecoration: 'none', color: "#FF2F6E", marginTop: "1rem", marginRight: "3rem" }}>더보기</MoreOption>
            </WrapTitle>
            <WrapContent>
                {searchMovie && searchMovie.map((sm, index) => (
                    <SearchCont search={sm} key={index}></SearchCont>
                ))}
            </WrapContent>
            <div style={{ height: "1px", margin: "0 4rem", backgroundColor: "#00000020" }} />
            <WrapTitle>
                <h3>TV 프로그램</h3>
                <MoreOption style={{ textDecoration: 'none', color: "#FF2F6E", marginTop: "1rem", marginRight: "3rem" }}>더보기</MoreOption>
            </WrapTitle>
            <WrapContent>
                {searchTv && searchTv.map((se, index) => (
                    <SearchCont search={se} key={index}></SearchCont>
                ))}
            </WrapContent>
        </SearchBlock>
    );
};

export default Search;
