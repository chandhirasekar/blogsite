import React from "react";
import { Link } from "react-router-dom";
import {
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
} from "mdb-react-ui-kit";

function Latest({imageUrl,title,id}) {
  return (
    <div>
      <Link to={`/blogs/${id}`}>
        <MDBCard style={{ maxWidth: "300px", height: "80px" }} className="mt-2">
          <MDBRow className="G-0">
            <MDBCol md="3">
              <MDBCardImage
                src={imageUrl}
                alt={title}
                fluid
                className="rounded-circle"
                style={{ height: "80px" }}
              />
            </MDBCol>
            <MDBCol md="8">
           <MDBCardBody>
            <p className="text-start latest-title">{title}</p>
           </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </Link>
    </div>
  );
}

export default Latest;
