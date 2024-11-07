import express from 'express';
import path from 'path';
import {AddressInfo} from 'net';
import { getDocs } from 'firebase/firestore';
import { vtos_arcaCollection } from '../../client/src/db';

const app = express();
const port = process.env.PORT || 3000;

const publicDir = path.join(__dirname, '../../../client/public');
app.use(express.static(publicDir));


app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.get('/home', (req, res) => {
  res.sendFile(path.join(publicDir, 'home.html'));
});

app.get('/fetch-vtos_arca', async (req, res) => {
  try {
    const vtos_arcaSnapshot = await getDocs(vtos_arcaCollection);
    const vtos_arcaList = vtos_arcaSnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
    console.log(vtos_arcaList);
    res.json(vtos_arcaList);
  } catch (error) {
    console.error("Error fetching vtos_arca", error);
    res.status(500).send("Error fetching vtos_arca");
  }
});

const server = app.listen(port, () => {
  const address = server.address() as AddressInfo;
  console.log(`Server is running on http://localhost:${address.port}`);
});