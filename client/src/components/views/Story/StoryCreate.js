// import React, { Component } from 'react'
// import { render } from 'react-dom' // eslint-disable-line no-unused-vars
// import Editor, { composeDecorators } from 'draft-js-plugins-editor'
// import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
// import { fromJS } from 'immutable';
// import { connect } from 'react-redux';
// import request from 'superagent';
// import axios from 'axios'

// import * as StoriesActions from '../../../_actions/story_actions';

//  /* eslint-disable*/
// import '../../Style/LastDraft/draft.css'
// import '../../Style/LastDraft/example.css'

// /* Emoji plugin */
// // import createEmojiPlugin from 'draft-js-emoji-plugin'
// // import 'draft-js-emoji-plugin/lib/plugin.css'
// const emojiPlugin = createEmojiPlugin()
// const { EmojiSuggestions } = emojiPlugin

// /* Hashtag plugin */
// import createHashtagPlugin from 'draft-js-hashtag-plugin'
// import 'draft-js-hashtag-plugin/lib/plugin.css'
// const hashtagPlugin = createHashtagPlugin()

// /* Image with Alignment, dnd, focus, resize plugin */
// import createImagePlugin from 'draft-js-image-plugin'
// import createAlignmentPlugin from 'draft-js-alignment-plugin'
// import createFocusPlugin from 'draft-js-focus-plugin'
// import createResizeablePlugin from 'draft-js-resizeable-plugin'
// // import createDndPlugin from 'draft-js-drag-n-drop-plugin'

// import 'draft-js-alignment-plugin/lib/plugin.css'
// import 'draft-js-focus-plugin/lib/plugin.css'

// const focusPlugin = createFocusPlugin()
// const resizeablePlugin = createResizeablePlugin()
// const dndPlugin = createDndPlugin()
// const alignmentPlugin = createAlignmentPlugin()
// const { AlignmentTool } = alignmentPlugin

// const decorator = composeDecorators(
//   resizeablePlugin.decorator,
//   alignmentPlugin.decorator,
//   focusPlugin.decorator,
//   dndPlugin.decorator
// )
// const imagePlugin = createImagePlugin({ decorator })

// /* Linkify */
// import createLinkifyPlugin from 'draft-js-linkify-plugin'
// import 'draft-js-linkify-plugin/lib/plugin.css'
// const linkifyPlugin = createLinkifyPlugin()


// /* Toolbar */
// import createToolbarPlugin from 'last-draft-js-toolbar-plugin'
// import 'last-draft-js-toolbar-plugin/lib/plugin.css'
// const toolbarPlugin = createToolbarPlugin()
// const { Toolbar } = toolbarPlugin

// /* Side Toolbar */
// import createSidebarPlugin from 'last-draft-js-sidebar-plugin'
// import 'last-draft-js-sidebar-plugin/lib/plugin.css'
// const sidebarPlugin = createSidebarPlugin()
// const { Sidebar } = sidebarPlugin

// /* Embed plugin */
// import createEmbedPlugin from 'draft-js-embed-plugin'
// import 'draft-js-embed-plugin/lib/plugin.css'
// const embedPlugin = createEmbedPlugin()

// /* Link plugin */
// import createLinkPlugin from 'draft-js-link-plugin'
// import 'draft-js-link-plugin/lib/plugin.css'
// const linkPlugin = createLinkPlugin()

// /* Color */
// import {colorStyleMap} from 'draft-js-color-picker-plugin'

// /* init the plugins */
// const plugins = [
//   dndPlugin, focusPlugin, alignmentPlugin, resizeablePlugin, imagePlugin,
//   emojiPlugin, hashtagPlugin, linkifyPlugin, 
//   toolbarPlugin, sidebarPlugin, embedPlugin, linkPlugin
// ]



// export default class StoryCreate extends Component {
//     constructor() {
//         super()
//         this.state = {
//           title: EditorState.createEmpty(),
//           content: EditorState.createEmpty(),
//         }
//       }
//     render() {
//         return (
//             <div>

//                 <Editor/>
//             </div>
//         )
//     }
// }
