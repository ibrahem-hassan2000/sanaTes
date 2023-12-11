import { Button, TextInput } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Table } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const elements = [
  { ID: 6, email: "test@gmail.com", symbol: "Male", name: "Carbon" },
  { ID: 7, email: "test@gmail.com", symbol: "Male", name: "Nitrogen" },
  { ID: 39, email: "test@gmail.com", symbol: "Male", name: "Yttrium" },
  { ID: 56, email: "test@gmail.com", symbol: "Male", name: "Barium" },
  { ID: 58, email: "test@gmail.com", symbol: "Male", name: "Cerium" },
];
function Index() {
  const [nameFilter, setNameFilter] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();
  const rows = elements
    .filter((item) =>
      item.name.toLowerCase().includes(nameFilter.toLowerCase())
    )
    .map((element, i) => (
      <Table.Tr key={element.name}>
        <Table.Td>{i + 1}</Table.Td>
        <Table.Td>{element.name}</Table.Td>
        <Table.Td>{element.email}</Table.Td>
        <Table.Td>{element.symbol}</Table.Td>
        <Table.Td>
          <div className="btnTable">
            <Button className="deletBtn">Delet</Button>
            <Button className="ShowBtn">Show</Button>
            <Button className="EditBtn">Edit</Button>
          </div>
        </Table.Td>
      </Table.Tr>
    ));
  return (
    <div className="homePage">
      <h1 className="text-[50px] text-center ">{t("index.members")}</h1>
      <div className="NewAdd">
        <Button
          className="NewAddBtn mb-3 md:mb-6"
          onClick={() => {
            navigate("/edit");
          }}
        >
          Add New Member
        </Button>
      </div>
      <TextInput
        label="Filter Members By Name"
        onChange={(e) => {
          setNameFilter(e.target.value);
        }}
        placeholder="Your name"
        radius="md"
      />
      <div className="tableUsers">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>ID</Table.Th>
              <Table.Th>Name</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th> Gender </Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>
    </div>
  );
}

export default Index;
