# Проблема
В рамках проводимых контрольно-надзорных мероприятий  появляются проблемные объекты (не являющихся объектом муниципального и регионального контроля), требующие дополнительной работы межведомственных рабочих групп по нормализации состояния объекта или принятия решения о его сносе.

При ведении рабочих групп у участников процесса возникает проблема с учетом и отслеживанием всех принятых решений и их исполнения. Теряется фокус на объектах требующих включения на рассмотрение. Также необходимо проверить качество исполнения работ и соблюдение сроков. 

Основная проблема в том, что информация разрознена, требуется ручное ведение протокола и контроля исполнения протокола.

# Задача
Необходимо разработать гибкий (настраиваемый по атрибутному составу) единый сервис, с возможностью добавления фотоматериалов и документов к объекту контроля (в том числе с возможность загрузки реестра XML, который разложиться на отдельные карточки - элементы работы)), счетчиком исполнения принятых решений и формированием повестки по новым объектам. а также в случае окончания срока исполнения поручений или его нарушения. Кроме того должен быть гибкий (настраиваемый функционал) по настройке протокола принятых решений.

# Результаты работы
Комплексное веб-приложение, позволяющее помимо работы с данными (добавления и редактирования различных объектов, загрузки XML) полностью проходить через цикл операций учёта объектов недвижимости. В приложении по созданным в базе объектам и поручениям автоматически формируются повестки, по которым можно планировать встречи рабочих групп, и, в результате встречи рабочей группы, формировать протокол.
