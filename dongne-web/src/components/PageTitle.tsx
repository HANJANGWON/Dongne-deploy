import { Helmet } from "react-helmet-async";

type PageTitleProps = {
  title: string;
};

const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <Helmet>
      <title>{title} | 동네</title>
    </Helmet>
  );
};

export default PageTitle;
