import app from './app';

const PORT = process.env.PORT || 3006;

app.listen(PORT, () => {
  console.log(`😎 Server is listening on port ${PORT}`);
});

