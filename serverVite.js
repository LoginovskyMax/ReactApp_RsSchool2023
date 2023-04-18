import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer(){
    const app = express()

    const vite = await createViteServer({
        server: { middlewareMode:true},
        appType: 'custom'
    })

    app.use(vite.middlewares)

    app.use('*', async (req,res, next) => {
        const url = req.originalUrl

        try {
            let template = fs.readFileSync(
                path.resolve(__dirname, 'index.html'),
                'utf-8'
            )

            template = await vite.transformIndexHtml(url, template)
         
            const { render } = await vite.ssrLoadModule('/src/serverApp.tsx')
            const AppHtml = await render(url)
            const html = template.replace('<!--ssr-outlet-->',AppHtml)

            await render(url, {
              onShellReady(){
                res.write(html)
             
              },
              onAllReady(){
                res.write(html)
                res.end()
              },
            })

        } catch (e){

            vite.ssrFixStacktrace(e)

            next(e)
        }

    })

    app.listen(3001, ()=>console.log(`listening on http://localhost:3001`))
}

createServer()