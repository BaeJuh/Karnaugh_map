import Main from "./components/Main";
import Title from "./components/Title";

import styles from "./style/App.module.scss";

const App = () => {
  return (
    <div className={styles.container}>
      <Title></Title>
      <Main></Main>
    </div>
  );
}

export default App;
