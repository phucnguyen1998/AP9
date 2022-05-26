import { Box, Button, TextareaAutosize, Theme, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { makeStyles } from '@mui/styles'
import { FormInput } from '../../FormInput'
import { formCommentValidation } from './validationSchema'

interface IFormCommentProps {
  onFilter?: (values: any) => void
}

const useStyles = makeStyles((theme: Theme) => ({
  styleInput: {
    paddingBottom: '24px',
    width: '100%',
    '& > .MuiFormControl-root > .MuiOutlinedInput-root > .Mui-disabled': { background: '#ECECEE;' },
  },
}))

const FormComment: React.FunctionComponent<IFormCommentProps> = (props) => {
  const { t } = useTranslation()
  const classes = useStyles()
  const { onFilter } = props

  const onSubmit = (value: any) => {
    if (typeof onFilter === 'function') {
      onFilter(value)
    }
  }

  return (
    <Box sx={{ paddingTop: '24px', display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Typography sx={{ fontSize: '28px', fontWeight: 700 }}>{t('news.comment_post_comment_title')}</Typography>
      <Formik
        initialValues={{ name: '', email: '', website: '', comment: '' }}
        onSubmit={onSubmit}
        validationSchema={formCommentValidation(t)}
      >
        {({ handleChange, touched, errors }) => {
          return (
            <Form>
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', rowGap: '8px', padding: '24px 0' }}>
                <Typography sx={{ fontWeight: 600, fontSize: '16px' }}>{t('news.comment_field_comment')}</Typography>
                <TextareaAutosize
                  minRows={10}
                  name="comment"
                  onChange={handleChange}
                  style={{ width: '100%', borderRadius: '5px', padding: '12px', borderColor: '#ECECEE' }}
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', columnGap: '24px' }}>
                <Field
                  fullWidth
                  required={true}
                  className={classes.styleInput}
                  size="small"
                  component={FormInput}
                  name="name"
                  type="text"
                  placeholder={t('news.comment_field_name')}
                  error={touched.name && Boolean(errors.name)}
                />
                <Field
                  fullWidth
                  required={true}
                  className={classes.styleInput}
                  size="small"
                  component={FormInput}
                  name="email"
                  type="text"
                  placeholder={t('news.comment_field_email')}
                  error={touched.email && Boolean(errors.email)}
                />
                <Field
                  fullWidth
                  required={false}
                  className={classes.styleInput}
                  size="small"
                  component={FormInput}
                  name="website"
                  type="text"
                  placeholder={t('news.comment_field_website')}
                />
              </Box>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  background: '#2D95E3',
                  textTransform: 'initial',
                  padding: '12px 24px',
                  fontSize: '16px',
                  lineHeight: '24px',
                }}
              >
                {t('news.comment_button_submit')}
              </Button>
            </Form>
          )
        }}
      </Formik>
    </Box>
  )
}

export default FormComment
