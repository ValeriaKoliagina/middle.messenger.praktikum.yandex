# Sprint-2

1. Домен из Netlify, где можно потыкать (sprint-2 branch): https://happy-hamilton-deb78f.netlify.app/,
   домен для деплоя: https://nostalgic-raman-071242.netlify.app
2. Макет в Figma: https://www.figma.com/file/pFjKdu2Zj6qZp6yd9gIcPR/Messenger
3. PR: https://github.com/ValeriaKoliagina/middle.messenger.praktikum.yandex/pull/1

# Вопросы:
1. Как можно оптимизировать длинное приведение типов в моем конкретном случае на примере: 
```((<IModalOptions>(<IChatPageOptions> this.props).modalWindowRenameChat.props).modalInput)?.setProps(<IInputOptions>{ info: (<HTMLInputElement>event.target).value })```

# Описание
Мессенджер "Грустный лемур" - почувствуй свое одиночесво на нерабочем функционале. 

- Чтобы запустить грусть сделай вот так: npm run start
- Чтобы просто собрать грусть в кучку сделай так: npm run build
- Если грусти слишком много - нажми Ctrl + c

В животе у грустного лемура тесно расположились нативный JS, TypeScript, handlebars, express, parcel и пару библиотек для красоты.
Все это очень давит на лемура и он периодически икает от переполнявших его эмоций, что также отображается на работе данного приложения. 
Так как грутсный лемур от работы блюра (особенно с автозаполнением данных) становится еще грустнее, валидация добавлена на изменение поля, что делает грустного лемура чуточку менее грустным.
