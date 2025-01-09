// Previous imports remain the same...

const menuItems: MenuItem[] = [
  {
    title: 'Início',
    icon: <Home className="w-5 h-5" />,
    path: '/'
  },
  {
    title: 'Dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
    submenu: [
      { title: 'Overview', path: '/overview' },
      { title: 'Analytics', path: '/analytics' },
      { title: 'Reports', path: '/reports' },
    ],
  },
  {
    title: 'Relatórios',
    icon: <FileText className="w-5 h-5" />,
    submenu: [
      { title: 'Contas Semanais', path: '/relatorios/contas-semanais' },
      { title: 'Contas Mensais', path: '/relatorios/contas-mensais' },
      { title: 'Fechamento', path: '/relatorios/fechamento' },
    ],
  },
  {
    title: 'Factory',
    icon: <Factory className="w-5 h-5" />,
    submenu: [
      { title: 'Dashboard', path: '/emails/dashboard' },
      { title: 'Sacados', path: '/emails/sacados' },
      { title: 'Envio de E-mails', path: '/emails/enviar' },
      { title: 'Template de E-mail', path: '/emails/template' },
    ],
  },
  {
    title: 'Número por Extenso',
    icon: <FileText className="w-5 h-5" />,
    path: '/numero-extenso'
  },
  // Rest of the menu items remain the same...
];

// Rest of the file remains the same...