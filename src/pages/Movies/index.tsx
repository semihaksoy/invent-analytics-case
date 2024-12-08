import { useNavigate } from "react-router-dom";

import axiosInstance from "../../api/axiosInstance";
import usePaginatedData from "../../hooks/usePaginatedData";

import { Flex, Form } from "antd/lib";

import FormItemComponent from "../../components/FormItemComponent";
import InputComponent from "../../components/InputComponent";
import SelectComponent from "../../components/SelectComponent";
import TableComponent from "../../components/TableComponent";

import { Movie, MovieResponse } from "../../types/api/movies.types";

import { routes, TYPE_OPTIONS } from "../../utils/constants";

const INITIAL_FILTERS = {
  s: "Pokemon",
  y: "",
  type: "",
};

const Movies = () => {
  const navigate = useNavigate();

  const { 
    data: movies, 
    totalResults, 
    currentPage, 
    loading: tableLoading, 
    setPage, 
    setFilter 
  } = usePaginatedData({
    initialFilters: INITIAL_FILTERS,
    fetchData: async (params) => {
      const response = await axiosInstance.get<MovieResponse>("/", { params });
      return response.data;
    },
  });

  const [form] = Form.useForm();

  const columns = [
    { title: "Title", dataIndex: "Title", key: "Title" },
    { title: "Year", dataIndex: "Year", key: "Year" },
    { title: "IMDb ID", dataIndex: "imdbID", key: "imdbID" },
    { title: "Type", dataIndex: "Type", key: "Type" },
  ];

  const handleRowClick = (record: Movie) => {
    navigate(`${routes.movieDetails.replace(":id", record.imdbID)}`);
  };

  return (
    <Flex vertical justify="space-between" gap="large">
      <Form form={form}>
        <Flex gap="small">
          <FormItemComponent
            name="title"
            label="Title"
            component={InputComponent}
            componentProps={{
              onChange: (e) => setFilter("s", e.target.value),
            }}
          />
          <FormItemComponent
            name="year"
            label="Year"
            component={InputComponent}
            componentProps={{
              onChange: (e) => setFilter("y", e.target.value),
            }}
          />
          <FormItemComponent
            name="type"
            label="Type"
            component={SelectComponent}
            componentProps={{
              options: TYPE_OPTIONS,
              onChange: (value) => setFilter("type", value),
              className: "w-large",
            }}
          />
        </Flex>
      </Form>
      <TableComponent
        data={movies}
        columns={columns}
        totalResults={totalResults}
        currentPage={currentPage}
        onPageChange={setPage}
        loading={tableLoading}
        onRowClick={handleRowClick}
      />
    </Flex>
  );
}

export default Movies;