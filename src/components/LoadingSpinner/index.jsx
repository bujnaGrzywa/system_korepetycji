import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
`;

export const LoadingSpinner = ({ isLoading }) => (
  <div className="sweet-loading">
    <ClipLoader
      css={override}
      size={45}
      color={"#E97F02"}
      loading={isLoading}
    />
  </div>
);
