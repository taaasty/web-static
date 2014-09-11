# A sample Guardfile
# More info at https://github.com/guard/guard#readme
notification :tmux,
  display_message: true,
  timeout: 5, # in seconds
  default_message_format: '%s >> %s',
  # the first %s will show the title, the second the message
  # Alternately you can also configure *success_message_format*,
  # *pending_message_format*, *failed_message_format*
  line_separator: ' > ', # since we are single line we need a separator
  color_location: 'status-left-bg' # to customize which tmux element will

guard :bundler do
  watch('Gemfile')
  # Uncomment next line if Gemfile contain `gemspec' command
  # watch(/^.+\.gemspec/)
end

guard 'ctags-bundler', :src_path => ["app"], emacs: false, arguments: '-R --languages=coffee' do
  watch(/^(app)\/.*\.coffee$/)
  watch('Gemfile.lock')
end
