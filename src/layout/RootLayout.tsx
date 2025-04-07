import { FC } from "react";
import styles from "./RootLayout.module.css";
import { Layout, Typography } from "antd";

type LayoutProps = {
  children: React.ReactNode;
};

export const RootLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <Layout className={styles.container}>
      <Layout.Header className={styles.header}>
        <Typography.Title
          level={1}
          style={{ color: "white", padding: "16px 0" }}
        >
          Employee Management System
        </Typography.Title>
      </Layout.Header>
      <Layout.Content className={styles.main}>{children}</Layout.Content>
    </Layout>
  );
};
