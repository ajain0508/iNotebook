import React from 'react'


const Newsitem =(props)=> {
    
  
    let {title,description,imageUrl,newsUrl,author,date,source} = props;
    let a = new Date(date).toGMTString()

    return (
       
      <div className='my-3'>
        <div className="card d-flex" >
          {/* left set karne se sources thode andar aa rhe and z-index se overlap nhi ho rhe*/}
          <div display = "flex" style = {{"display":"flex" ,"position":"absolute","right":0}}>
        <span  className="badge rounded-pill bg-danger">{source}</span>
        </div>
            <img  src={(imageUrl)?imageUrl:"https://cdn.telanganatoday.com/wp-content/uploads/2023/07/Mozilla-releases-last-Firefox-update-for-old-versions-of-Windows-macOS.jpg"} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text"> {description}...</p>
                <p className='card-text'><small className='text-muted'>By {author?author:"Unknown"} on {a}</small></p>
                
                <a rel="noreferrer" href={newsUrl} target = "_blank" className="btn btn-primary btn-sm">Read More</a>
                
            </div>
        </div>
      </div>
      
    )
  }


export default Newsitem
