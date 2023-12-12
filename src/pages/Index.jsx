import { Button, TextInput } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Table } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useRecoilState } from "recoil";
import { user } from "../../atoms";

function Index() {
  const [FoundUser] = useRecoilState(user);
  const [Users, setUsers] = useState([]);
  const UserRef = collection(db, "Users");

  useEffect(() => {
    const getData = onSnapshot(
      UserRef,
      (snapshot) => {
        const list = [];
        snapshot.docs.forEach((item) => {
          list.push({ id: item.id, ...item.data() });
        });
        setUsers(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      getData();
    };
  }, []);
  const [nameFilter, setNameFilter] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const rows = Users.filter((item) =>
    item.name.toLowerCase().includes(nameFilter.toLowerCase())
  ).map((element, i) => (
    <Table.Tr key={i}>
      <Table.Td>{i + 1}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.email}</Table.Td>
      <Table.Td>{element.gender}</Table.Td>
      <Table.Td>
        <div className="btnTable">
          <Button
            className="deletBtn"
            onClick={() => {
              deletUSer(element.id);
            }}
          >
            {t("index.delet")}
          </Button>
          <Button
            className="ShowBtn"
            onClick={() => {
              navigate(`/show/${element.id}`);
            }}
          >
            {t("index.show")}
          </Button>
          <Button
            className="EditBtn"
            onClick={() => {
              navigate(`/edit/${element.id}`);
            }}
          >
            {t("index.edit")}
          </Button>
        </div>
      </Table.Td>
    </Table.Tr>
  ));
  const deletUSer = async (id) => {
    await deleteDoc(doc(db, "Users", id));
    setUsers(Users.filter((user) => user.id !== id));
  };

  if (!FoundUser) {
    navigate("/login");
  } else {
    return (
      <div className="homePage">
        <h1 className="text-[50px] text-center ">{t("index.members")}</h1>
        <div className="NewAdd">
          <Button
            className="NewAddBtn mb-3 md:mb-6"
            onClick={() => {
              navigate("/create");
            }}
          >
            {t("index.add")}
          </Button>
        </div>
        <TextInput
          label={t("index.filter")}
          onChange={(e) => {
            setNameFilter(e.target.value);
          }}
          placeholder={t("index.enterName")}
          radius="md"
        />
        <div className="tableUsers">
          <Table>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>ID</Table.Th>
                <Table.Th>{t("index.name")}</Table.Th>
                <Table.Th>{t("index.email")}</Table.Th>
                <Table.Th> {t("index.gender")} </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default Index;
