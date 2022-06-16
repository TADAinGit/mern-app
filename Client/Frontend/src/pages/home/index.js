import { Box } from "@mui/material";
import Carousel from "./carousel";
import CardCustom from "./card";
import { ButtonCustom2 } from "./button";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const userTask = [
  {
    path: "/transfer",
    image: "./imgs/exchange.png",
    title: "Chuyển tiền",
    content: "Chuyển tiền tới người dùng",
  },
  {
    path: "/deposit",
    image: "./imgs/upload.png",
    title: "Nạp tiền",
    content: "Nạp tiền vào ví của bạn",
  },
  {
    path: "/withdraw",
    image: "./imgs/cash-withdrawal.png",
    title: "Rút tiền",
    content: "Rút tiền nhanh chóng",
  },
  {
    path: "/buyphonecard",
    image: "./imgs/cashless-payment.png",
    title: "Mua thẻ điện thoại",
    content: "Mua mã thẻ điện thoại tiện lợi",
  },
];

const adminTask = [
  {
    path: "/listuser",
    image: "./imgs/exchange.png",
    title: "Người dùng",
    content: "Quản lý người dùng",
  },
  {
    path: "/listtransaction",
    image: "./imgs/upload.png",
    title: "Giao dịch",
    content: "Quản lý giao dịch",
  },
];

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLogin } = useSelector((state) => state.user);

  return (
    <>
      <Carousel autoPlay infiniteLoop showArrows={false} showThumbs={false}>
        <div>
          <img
            src="./imgs/banner.jpg"
            style={{
              objectFit: "cover",
              maxHeight: "300px",
              borderRadius: "5px",
            }}
          />
          {/* <p className="legend">51900587 - Nguyen Dinh Dung</p> */}
        </div>
        <div>
          <img
            src="./imgs/banner2.png"
            style={{
              objectFit: "cover",
              maxHeight: "300px",
              borderRadius: "5px",
            }}
          />
          {/* <p className="legend">Legend 2</p> */}
        </div>
        <div>
          <img
            src="./imgs/banner3.png"
            style={{
              objectFit: "cover",
              maxHeight: "300px",
              borderRadius: "5px",
            }}
          />
          {/* <p className="legend">Legend 3</p> */}
        </div>
      </Carousel>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: { lg: "auto", xl: "400px" },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {(user !== null && user.data.accountRole === "admin"
            ? adminTask
            : userTask
          ).map((task, i) => (
            <CardCustom
              key={i}
              hrefBtn={task.path}
              urlImg={task.image}
              title={task.title}
            >
              <h2>{task.title}</h2>
              <p>{task.content}</p>
            </CardCustom>
          ))}
        </Box>
      </Box>
    </>
  );
}

export default Home;
