import * as Yup from 'yup'

const formCommentValidation = (t: any) => {
  return Yup.object().shape({
    name: Yup.string().required(t('news.comment_validate_name')),
    email: Yup.string().email(t('news.comment_validate_email_type')).required(t('news.comment_validate_email')),
  })
}

export { formCommentValidation }
