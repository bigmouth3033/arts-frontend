import { useSearchParams } from "react-router-dom";
import { VerifyAccountFn } f
import { useEffect, useState } from "react";

import ErrorPopUp from "@/shared/components/PopUp/ErrorPopUp";
import SuccessPopUp from "@/shared/components/PopUp/SuccessPopUp";
import { CustomerRequest } from "@/shared/api/customerApi";

export default function Homepage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const verifyAccountFn = VerifyAccountFn();
  const [successPopUp, setSuccessPopUp] = useState(false);
  const [errorPopUp, setErrorPopUp] = useState(false);
  const customerRequest = CustomerRequest();
  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      verifyAccountFn.mutate(
        { token },
        {
          onSuccess: (response) => {
            setSuccessPopUp(true);
          },
          onError: (error) => {
            setErrorPopUp(true);
          },
        }
      );
    }
  }, []);

  return (
    <div>
      {successPopUp && (
        <SuccessPopUp
          action={() => {
            setSuccessPopUp(false);
            searchParams.delete("token");
            setSearchParams(searchParams);
          }}
          header={"Success Verify"}
          message={"Welcome"}
        />
      )}
      {errorPopUp && (
        <ErrorPopUp
          action={() => {
            setErrorPopUp(false);
            searchParams.delete("token");
            setSearchParams(searchParams);
          }}
          header={"Erorr email"}
          message={"Verify Fail"}
        />
      )}
    </div>
  );
}
