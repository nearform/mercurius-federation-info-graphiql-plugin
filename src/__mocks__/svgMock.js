import React from 'react'

// vite-plugin-svgr 5 exposes the component as the default export of
// `./icon.svg?react`, replacing the old `{ ReactComponent }` named export.
const SvgMock = props => <svg {...props} />

module.exports = SvgMock
module.exports.ReactComponent = SvgMock
module.exports.default = SvgMock
