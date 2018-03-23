/* eslint-env node */

const jsdoc2md = require('jsdoc-to-markdown'),
	fs = require('fs-extra'),
	appFolder = './app',
	docsFolder = './docs',
	folders = [
		'components'
	]

/* Remove docs folder if it exists */
if (fs.existsSync(docsFolder)){
	fs.removeSync(docsFolder)
}

/* Create new docs folder */
fs.mkdirSync(docsFolder)

/* Find all files in provided folders and generate documentation from them */
folders.forEach(folder => {
	const currentFolder = `${appFolder}/${folder}`

	/* Create a subfolder in the docs folder */
	fs.mkdirSync(`${docsFolder}/${folder}`)

	fs.readdir(currentFolder, (err, files) => {
		files.forEach(file => {
			const pureName = file.replace('.js', ''),
				filePath = `${currentFolder}/${file}`

			jsdoc2md.render({
				files: filePath
			}).then(data => {
				fs.writeFileSync(`${docsFolder}/${folder}/${pureName}.md`, data)
			})
		})
	})
})
