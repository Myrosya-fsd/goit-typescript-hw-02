import { Field, Form, Formik } from "formik";
import type { FormikHelpers } from "formik";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  handleChangeQuery: (query: string) => void;
}

interface FormValues {
  query: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleChangeQuery }) => {
  const initialValues: FormValues = {
    query: "",
  };

  const handleSubmit = (
    values: FormValues,
    options: FormikHelpers<FormValues>
  ) => {
    console.log(values);
    handleChangeQuery(values.query);
    options.resetForm();
  };

  return (
    <header className={styles.header}>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
          <Field
            className={styles.field}
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button className={styles.btn} type="submit">
            Search
          </button>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
