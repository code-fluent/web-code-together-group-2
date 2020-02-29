const express = require("express");
const cors = require("cors");
const cheerio = require("cheerio");
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/bookmarks", async function(req, res) {
  const { url } = req.body;
  const response = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"
    }
  });

  const html = response.data;
  const $ = cheerio.load(html);

  const title =
    $('meta[property="og:title"]').attr("content") || $("title").text();

  const description =
    $('meta[property="og:description"]').attr("content") ||
    $('meta[property="description"]').attr("content");

  const image =
    $('meta[property="og:image"]').attr("content") ||
    $("img")
      .first()
      .attr("src");

  console.log({ title, description, image });

  res.json();
});

app.listen(8080);
