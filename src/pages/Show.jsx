import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { useTranslation } from "react-i18next";
import { Button } from "@mantine/core";

function Show() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [GetData, setGetData] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getDataOneUser();
    }
  }, [id]);
  const getDataOneUser = async () => {
    const docRef = doc(db, "Users", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setGetData({ ...snapshot.data() });
    }
  };
  const deletUSer = async () => {
    await deleteDoc(doc(db, "Users", id));
    navigate("/");
  };
  return (
    <>
      <div className="show">
        {GetData?.name ? (
          <div className="content">
            <div className="head">
              <img
                src={`${GetData?.imageUser ? GetData.imageUser : ""}`}
                alt="user"
              />
              <div className="info">
                <h2>{GetData.name}</h2>
                <h3>{GetData.email}</h3>
                <h4>{GetData.membership}</h4>
              </div>
            </div>
            <div className="ul">
              <ul>
                <li>
                  {t("show.address")} : <p> {GetData.address}</p>{" "}
                </li>
                <li>
                  {t("show.brith")} : <p> {GetData.brith}</p>{" "}
                </li>
                <li>
                  {t("show.gender")} : <p> {GetData.gender}</p>{" "}
                </li>
                <li>
                  {t("show.idNum")} : <p> {GetData.idNum}</p>{" "}
                </li>
              </ul>
            </div>
            <div className="btnTable">
              <Button
                className="deletBtn"
                onClick={() => {
                  deletUSer();
                }}
              >
                {t("index.delet")}
              </Button>

              <Button
                className="EditBtn"
                onClick={() => {
                  navigate(`/edit/${id}`);
                }}
              >
                {t("index.edit")}
              </Button>
              <Button
                className="EditBtn"
                onClick={() => {
                  navigate(`/`);
                }}
              >
                {t("index.back")}
              </Button>
            </div>
          </div>
        ) : (
          <h1>no data</h1>
        )}
      </div>
    </>
  );
}

export default Show;
