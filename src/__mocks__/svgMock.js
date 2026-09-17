import React from 'react'

// vite-plugin-svgr 5 exposes the component as the default export of
// `./icon.svg?react`.
const SvgMock = props => <svg {...props} />

module.exports = SvgMock
module.exports.default = SvgMock
