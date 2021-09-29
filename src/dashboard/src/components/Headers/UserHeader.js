import React from "react";



class UserHeader extends React.Component {
  render() {
    return (
      <>
        <div
          className="header pb-8 pt-5 pt-lg-6 d-flex align-items-center"
          style={{

            backgroundSize: "cover",
            backgroundPosition: "center top"
          }}
        >
          <span className="mask bg-gradient-info opacity-8" />

        </div>
      </>
    );
  }
}

export default UserHeader;
