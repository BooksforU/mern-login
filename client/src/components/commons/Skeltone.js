import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonCard = () => {
  return (
    <section>
      <h2 className="section-title">
        <Skeleton duration={1} height={30} width={300} />
      </h2>
      <ul className="list">
    <div className="row">
        
    <div className="col-lg-12 col-md-12 col-xs-12">
            <li className="card">
                <Skeleton height={400} width={1000} />
                <h4 className="card-title">
                <Skeleton circle={true} height={50} width={50} /> &nbsp;
                <Skeleton height={36} width={`80%`} />
                </h4>
                <div className="card-metrics">
                <Skeleton width={`90%`} />
                </div>
            </li>
        </div>
        {Array(30)
          .fill()
          .map((item, index) => (
           
              <div className="col-lg-3 col-md-3 col-xs-12">
                <li className="card" key={index}>
                  <Skeleton height={300} />
                  <h4 className="card-title">
                    <Skeleton circle={true} height={50} width={50} /> &nbsp;
                    <Skeleton height={36} width={`80%`} />
                  </h4>
                  <div className="card-metrics">
                    <Skeleton width={`90%`} />
                  </div>
                </li>
              </div>
       
       ))}
       </div>
      </ul>
    </section>
  );
};

export default SkeletonCard;
