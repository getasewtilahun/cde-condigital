import React, { useEffect, useState } from "react";

import Card from "antd/lib/card";
import Button from "antd/lib/button";
import Steps from "antd/lib/steps";
import Logo from "../../Images/LogoHorizontal.svg";
import BasicInfo from "./BasicInfo/BasicInfo.component";
import AdditionalInfo from "./AdditionalInfo/AdditionalInfo.component";

import { RouteConstants } from "../../router/Constants";
import { Link } from "react-router-dom";
import { Form } from "antd";

const SignUpComponent = () => {
  useEffect(() => {
    const query = window.location.search;
    let params = new URLSearchParams(query);
    let ref: any = params.get("ref");
    localStorage.setItem("reference_user", ref);
  }, []);

  const [current, setCurrent] = React.useState(0);
  const [basic_info_form] = Form.useForm();
  const [additional_info_form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [basic_info, setBasicInfo] = useState({
    full_name: "",
    email: "",
    password: "",
    phone_number: "",
    company: {
      name: "",
      type: "",
      category: "",
      country: "Ethiopia",
    },
    role: "",

    language: "English",
  });

  const { Step } = Steps;

  const next = () => {
    if (current < 3) setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const onNext = () => {
    if (current === 0) {
      basic_info_form.submit();
    } else if (current === 1) {
      additional_info_form.submit();
    }
  };

  const steps = [
    {
      title: "Basic Information",
      content: (
        <BasicInfo
          form={basic_info_form}
          data={basic_info}
          next={next}
          setData={setBasicInfo}
        />
      ),
    },

    {
      title: "Additional Information",
      content: (
        <AdditionalInfo
          form={additional_info_form}
          data={basic_info}
          next={next}
          setData={setBasicInfo}
          setLoading={setLoading}
        />
      ),
    },
    // {
    //   title: "Verification",
    //   content: <Verification next={next} />,
    // },
  ];

  return (
    <div
      className="container-fluid"
      style={{ backgroundColor: "#f5f8fd", height: "100vh" }}
    >
      <nav>
        <div className="container"></div>
      </nav>

      {/* <Row className="mt-4  container d-block">
            <h4 className="mb-1 mt-4 font-weight-bold">Features</h4>
            <p style={{opacity:".6",fontSize:"12px",marginBottom:"50px"}}>Upon making the purchase of our license of any kind, users are entitled to access a whole collection.</p>
          </Row> */}
      <div className="mtop-5 col-lg-7 col-sm-9 mx-auto">
        <img src={Logo} alt="Logo" className="LoginLogo mx-auto d-block" />
        <h4 className="mb-4 mt-4 font-weight-bold text-center h4-20">
          Create Account
        </h4>
        <h5 className="small col-lg-7 col-sm-9 mx-auto text-center">
          Already have an account?{" "}
          <Link to={RouteConstants.LOGIN}>
            <a className="primary">Sign in here</a>
          </Link>
        </h5>
        <Steps
          current={current}
          style={{ width: "50%" }}
          className="mx-auto"
          progressDot={false}
        >
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content col-lg-7 col-sm-9 mx-auto mt-0 pt-1">
          <Card>{steps[current].content}</Card>
        </div>
        <div className="steps-action col-lg-7 col-sm-9 mx-auto text-right">
          {current > 0 && (
            <Button
              className="btn-outline"
              style={{ margin: "0 8px" }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}

          <Button type="primary" onClick={onNext} loading={loading}>
            {current === steps.length - 1 ? "Done" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default SignUpComponent;
