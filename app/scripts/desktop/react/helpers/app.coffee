window.AppHelpers =

  # Ставит фокус на input и выделяет содержимое
  reselectAndFocus: (node) ->
    node.focus()
    @selectAllText node

  selectAllText: (node) ->
    value       = node.value
    valueLength = value.length

    if node.setSelectionRange?
      node.setSelectionRange 0, valueLength
    else
      node.value = value