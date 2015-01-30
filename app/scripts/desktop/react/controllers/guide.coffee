GuideController =

  start: ->
    # Запускаем гайд
    userToolbar = document.querySelectorAll(".toolbar--nav")[1]
    userToolbarItem = $(userToolbar).find(".toolbar__popup-item").eq(0).get(0)

    userToolbarClicked = false

    intro = introJs.introJs()

    intro.setOptions(
      steps: [
        {
          intro: "<div class='introjs-tooltiptitle'>Добро пожаловать на Taaasty!</div> Это дневник, в который хочется писать каждый день"
        }
        {
          intro: "<div class='introjs-tooltiptitle'>Сейчас мы познакомим Вас с&nbsp;основными элементами</div> Мы постараемся рассказать про каждый элемент отдельно, чтобы Вы прочуствовали все возможности Taaasty. Жмите &laquo;Далее&raquo; и приступим :)"
        }
        {
          element: document.querySelectorAll(".post")[1]
          intro: "<div class='introjs-tooltiptitle'>Напишите что-нибудь или добавьте фотографию</div> Вы можете размещать фотографии, писать тексты, постить ссылки с любимых сервисов. Мы поддерживаем instagram, youtube и еще более 500 сервисов"
          position: "left"
        }
        {
          element: document.querySelector(".hero__box")
          intro: "<div class='introjs-tooltiptitle'>Заголовок тлога &mdash; это профиль</div> Вся информация о тлоге в одном месте. Просто раскройте кликом мыши. Там же можно подписаться/отписаться"
          position: "bottom"
        }
        {
          element: userToolbarItem
          intro: "<div class='introjs-tooltiptitle'>Делитесь своими мыслями в социальных сетях</div> Интересные мысли, которыми хотелось бы поделиться со всем миром?"
          position: "left"
        }
        {
          element: document.querySelector(".social-share")
          intro: "<div class='introjs-tooltiptitle'>Делитесь своими мыслями в социальных сетях</div> Интересные мысли, которыми хотелось бы поделиться со всем миром?"
          position: "right"
        }
      ]
      nextLabel: "Дальше"
      prevLabel: "Назад"
      skipLabel: "Отменить"
      doneLabel: "Конец"
      exitOnEsc: false
      exitOnOverlayClick: false
      showStepNumbers: false
      showBullets: false
      showProgress: true
      overlayOpacity: .92
    )

    intro.onafterchange ->
      skipButton = document.querySelector(".introjs-skipbutton")
      className = skipButton.className + "introjs-visible"

      skipButton.className = className if intro._currentStep is (intro._introItems.length - 1)

      if intro._currentStep is 4
        userToolbar.click()
        userToolbarClicked = true
      else if userToolbarClicked
        userToolbar.click()
        userToolbarClicked = false

    intro.start()

module.exports = GuideController