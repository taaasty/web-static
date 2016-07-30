/*global i18n */
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import {
  changeImageUrl,
  createImageAttachments,
  deleteImages,
  startInsert,
  stopInsert,
  updateEntry,
} from '../../../../actions/EditorActions';
import {
  EDITOR_ENTRY_TYPE_IMAGE,
} from '../../../../constants/EditorConstants';
import {
  getNormalizedKey,
} from '../../../../services/EntryNormalizationService';
import EditorTextField from '../../Field/Text';
import EditorMediaBox from '../../MediaBox/MediaBox';
import EditorTypeImageWelcome from './Welcome';
import EditorTypeImageUrlInsert from './UrlInsert';
import EditorTypeImageLoaded from './Loaded';
import EditorTypeImageLoadingUrl from './LoadingUrl';
import NoticeService from '../../../../services/Notice';
import { Map } from 'immutable';

const emptyAttachments = Map();

const MAX_ATTACHMENTS = 8;
const WELCOME_STATE = 'welcome';
const INSERT_STATE = 'insert';
const LOADING_URL_STATE = 'loading';
const LOADED_STATE = 'loaded';

class EditorTypeImage extends Component {
  state = { dragging: false };
  draggingOn() {
    this.setState({ dragging: true });
  }
  draggingOff() {
    this.setState({ dragging: false });
  }
  getCurrentState() {
    const {
      imageAttachments,
      imageUrl,
      isInsertingUrl,
      isLoadingImageUrl,
    } = this.props;

    if (isInsertingUrl) {
      return INSERT_STATE;
    } else if (isLoadingImageUrl) {
      return LOADING_URL_STATE;
    } else if (imageUrl || imageAttachments.count()) {
      return LOADED_STATE;
    } else {
      return WELCOME_STATE;
    }
  }
  getMediaBoxState(currentState) {
    if (this.state.dragging) {
      return 'drag-hover';
    } else if (currentState === INSERT_STATE) {
      return 'insert';
    } else if (currentState === LOADING_URL_STATE) {
      return 'loading';
    } else if (currentState === LOADED_STATE) {
      return 'loaded'
    } else {
      return null;
    }
  }
  handleChangeImageUrl(imageUrl) {
    const { changeImageUrl, stopInsert } = this.props;

    changeImageUrl(imageUrl)
      .catch(() => NoticeService.notifyError(
        i18n.t('editor_image_doesnt_exist',
        { imageUrl }
      )));
    stopInsert();
  }
  handleSelectFiles(files) {
    let imageFiles = [].slice.call(files).filter((file) => {
      return file.type.match(/(\.|\/)(gif|jpe?g|png)$/i)
    });

    if (!imageFiles.length) {
      return NoticeService.notifyError(i18n.t('editor_files_without_images'));
    }

    if (imageFiles.length > MAX_ATTACHMENTS) {
      imageFiles = imageFiles.slice(0, MAX_ATTACHMENTS)
      NoticeService.notifyError(i18n.t('editor_files_limit_reached', { count: MAX_ATTACHMENTS }));
    }

    this.props.createImageAttachments(imageFiles);
  }
  renderEditorScreen(currentState) {
    const {
      deleteImages,
      imageAttachments,
      imageUrl,
      isUploadingAttachments,
      startInsert,
      stopInsert,
    } = this.props;

    switch (currentState) {
    case WELCOME_STATE:
      return (
        <EditorTypeImageWelcome
          onClickInsertState={startInsert}
          onDragLeave={this.draggingOff.bind(this)}
          onDragOver={this.draggingOn.bind(this)}
          onDrop={this.draggingOff.bind(this)}
          onSelectFiles={this.handleSelectFiles.bind(this)}
        />
      );
    case INSERT_STATE:
      return (
        <EditorTypeImageUrlInsert
          onCancel={stopInsert}
          onInsertImageUrl={this.handleChangeImageUrl.bind(this)}
        />
      );
    case LOADED_STATE:
      return (
        <EditorTypeImageLoaded
          imageAttachments={imageAttachments}
          imageUrl={imageUrl}
          isUploadingAttachments={isUploadingAttachments}
          onDelete={deleteImages}
        />
      );
    case LOADING_URL_STATE:
      return <EditorTypeImageLoadingUrl imageUrl={imageUrl} />;
    default:
      return null;
    }
  }
  render() {
    const {
      changeTitle,
      title,
     } = this.props;
    const currentState = this.getCurrentState();
    const editorClasses = classNames('post', 'post--image', 'post--edit', {
      'state--insert': currentState === INSERT_STATE,
    });

    return (
      <article className={editorClasses}>
        <div className="post__content">
          <EditorMediaBox
            entryType={EDITOR_ENTRY_TYPE_IMAGE}
            state={this.getMediaBoxState(currentState)}
          >
            {this.renderEditorScreen(currentState)}
          </EditorMediaBox>
          <EditorTextField
            className="post__content"
            mode="rich"
            onChange={changeTitle}
            placeholder={i18n.t('editor_description_placeholder')}
            text={title}
          />
        </div>
      </article>
    );
  }
}

EditorTypeImage.propTypes = {
  changeImageUrl: PropTypes.func.isRequired,
  changeTitle: PropTypes.func.isRequired,
  createImageAttachments: PropTypes.func.isRequired,
  deleteImages: PropTypes.func.isRequired,
  imageAttachments: PropTypes.object.isRequired,
  imageUrl: PropTypes.string,
  isInsertingUrl: PropTypes.bool.isRequired,
  isLoadingImageUrl: PropTypes.bool.isRequired,
  isSaving: PropTypes.bool.isRequired,
  isUploadingAttachments: PropTypes.bool.isRequired,
  startInsert: PropTypes.func.isRequired,
  stopInsert: PropTypes.func.isRequired,
  title: PropTypes.string,
};

const imageAttachmentsKey = getNormalizedKey(EDITOR_ENTRY_TYPE_IMAGE, 'imageAttachments');
const imageUrlKey = getNormalizedKey(EDITOR_ENTRY_TYPE_IMAGE, 'imageUrl');
const titleKey = getNormalizedKey(EDITOR_ENTRY_TYPE_IMAGE, 'title');

export default connect(
  (state) => ({
    imageAttachments: state.editor.getIn([ 'entry', imageAttachmentsKey ], emptyAttachments),
    imageUrl: state.editor.getIn([ 'entry', imageUrlKey ]),
    isSaving: state.editor.get('isSaving', false),
    isInsertingUrl: state.editor.get('isInsertingUrl', false),
    isLoadingImageUrl: state.editor.get('isLoadingImageUrl', false),
    isUploadingAttachments: state.editor.get('isUploadingAttachments', false),
    title: state.editor.getIn([ 'entry', titleKey ]),
  }),
  {
    changeImageUrl,
    createImageAttachments,
    deleteImages,
    startInsert,
    stopInsert,
    updateEntry,
  },
  (stateProps, dispatchProps) => {
    return Object.assign({}, stateProps, dispatchProps, {
      changeTitle: dispatchProps.updateEntry.bind(null, titleKey),
    })
  }
)(EditorTypeImage);
