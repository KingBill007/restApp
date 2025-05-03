//Created by: Enoch Dollar-Bill (KingBill007)
//LinkedIn: https://www.linkedin.com/in/enoch-dollar-bill-43b8b225b/
//Github: https://github.com/KingBill007 
import { StyleSheet, SafeAreaView } from 'react-native';
import Home from './screens/Home';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Home />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});