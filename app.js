//app.js目的:載入模組（例如 Express、Handlebars) 、設定路由

const express = require('express')
const app = express()
const port = 3000


//handlebars 在 Express 使用前的設定
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' })) //(樣板引擎的名稱, 和此樣板引擎相關的設定)。宣告預設請用名為 main.handlebars 當作佈局
app.set('view engine', 'handlebars')  //告訴 Express 說要設定的 view engine 是 handlebars

//設定靜態檔案的路由
app.use(express.static('public'))   //所有路由在進去前，先跑這一個檔案


const movieList = require('./movies.json')

app.get('/', (req, res) => {
  res.render('index', { movies: movieList.results })   //Express 會「回傳 HTML 來呈現前端樣板」。movies 是一個要放在 index.handlebars 使用 movieOne 這個物件的橋樑
})

app.get('/movies/:movie_id', (req, res) => {
  console.log('movie_id', req.params.movie_id)

  const movie = movieList.results.filter(item => item.id === Number(req.params.movie_id))     //item.id是數字，req.params.movie_id是字串)
  res.render('show', { movie: movie[0] })
})


app.get('/search', (req, res) => {
  console.log(req.query.keyword)
  const search_movies = movieList.results.filter((item) => {
    return item.title.toLocaleLowerCase().includes(req.query.keyword.toLocaleLowerCase())
  })
  res.render('index', { movies: search_movies, keyword: req.query.keyword })
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})