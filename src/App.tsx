// Previous imports remain the same...
import NumeroExtenso from './pages/NumeroExtenso';

// Inside the Routes component, add the new route:
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/numero-extenso" element={<NumeroExtenso />} />
  
  {/* Report Routes */}
  <Route path="/relatorios/contas-semanais" element={<ContasSemanais />} />
  <Route path="/relatorios/contas-mensais" element={<ContasMensais />} />
  <Route path="/relatorios/fechamento" element={<Fechamento />} />
  
  {/* Factory Routes */}
  <Route path="/emails/dashboard" element={<FactoryDashboard />} />
  <Route path="/emails/sacados" element={<Sacados />} />
  <Route path="/emails/enviar" element={<EnviarEmail />} />
  <Route path="/emails/template" element={<TemplateEmail />} />
  <Route path="/emails/historico" element={<HistoricoEmails />} />
</Routes>

// Rest of the file remains the same...