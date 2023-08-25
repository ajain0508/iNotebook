import React, { useEffect,useState } from "react";
import Newsitem from "./Newsitem";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News  = (props)=>{
  const {country,setProgress,category,apiKey,pageSize} = props
  const[articles,setArticles] = useState([]);
  const[loading,setLoading] = useState(true);
  const[page,setPage] = useState(1);
  const[totalResults,setTotalResults] = useState(0);

  const capitalizeFirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  

  const updateNews = async (props) => {
    setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;
    // this.setState({ loading: true });
    setLoading(true)

    let data = await fetch(url);
    setProgress(30);
    let parsedData = await data.json();
    setProgress(50);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    
    
    setProgress(100);
  };

  // for dynamic fetching
  // useEffect will run only once
  useEffect(()=>{
    document.title = `News-Monkey-${capitalizeFirst(category)}`;
    updateNews()
    

    // eslint-disable-next-line
  },[])
  // componentDidMount = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3b344fd7a6a04f90b84405d65afa0991&page=1&pageSize=${this.props.pageSize}`
    //   this.setState({loading:true})
    //   let data = await fetch(url)
    //   let parsedData = await data.json()
    //   // console.log(data)
    //   // console.log(parsedData)
    //   this.setState({articles:parsedData.articles,
    //     totalResults : parsedData.totalResults,
    //     loading:false
    //   });
    // window.scrollTo({
    //   top:0,
    //   behavior:"smooth"
    // })
    
  // };

  const handlePreviousClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3b344fd7a6a04f90b84405d65afa0991&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    // this.setState({loading:true})
    // let data = await fetch(url)
    // let parsedData = await data.json()
    // this.setState({
    //     page:this.state.page - 1,
    //     articles:parsedData.articles,
    //     loading:false

    //   })
    
    // this.setState({
    //   page: this.state.page - 1,
    // });
    setPage(page-1)
    updateNews();
  };
  const handleNextClick = async () => {
    if (
      page + 1 <=
      Math.ceil(totalResults / props.pageSize)
    ) {
      //     window.scrollTo({
      //         top:0,
      //         behavior:"smooth"
      //     })
      // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3b344fd7a6a04f90b84405d65afa0991&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
      // // set load as true
      // this.setState({loading:true})
      // let data = await fetch(url)
      // let parsedData = await data.json()
      // this.setState({
      //     page:this.state.page + 1,
      //     articles:parsedData.articles,
      //     loading:false
      //   })

      // this.setState({
      //   page: this.state.page + 1,
      // });
      setPage(page+1)
      updateNews();
    }
  };
  const fetchMoreData = async() => {
    
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page+1}&pageSize=${pageSize}`
    setPage(page+1)
      // this.setState({loading:true})
      setLoading(true)
      let data = await fetch(url)
      let parsedData = await data.json()
      
      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
      setLoading(false)

  };
  
    return (
      <>
      
        <h2 className="text-center" style = {{marginTop :"90px"}}>
          NewsMonkey from {capitalizeFirst(props.category)}
        </h2>
        {/* spinner component */}
         <div className="text-center">
          {loading && (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
              alt="loading"
              width="300px"
            />
          )}
        </div>

        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !==totalResults}
          loader={
            <div className="text-center">
              {(
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
                  alt="loading"
                  width= "150px"
                />
              )}
            </div>
          }
        >
          <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  {/* checking if title and description is null  */}
                  <Newsitem
                    title={element.title?element.title.slice(0, 55) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
          </div>
        </InfiniteScroll>

        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page < 2 ? true : false}
            type="button"
            className="btn btn-dark mx-3"
            onClick={this.handlePreviousClick}
          >
            &larr; Previous{" "}
          </button>
          <button
            disabled={
              this.state.page + 1 <=
              Math.ceil(this.state.totalResults / this.props.pageSize)
                ? false
                : true
            }
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  
}

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
};
export default News;
