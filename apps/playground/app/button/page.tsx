import { ButtonDemo } from '../../src/demos/button'
import { ComponentWorkbench } from '../../components/ComponentWorkbench'
import { componentCatalog } from '../../src/catalog'

export default function ButtonPage() {
  const item = componentCatalog[0]
  return <div className="mx-auto w-full max-w-7xl"><ComponentWorkbench title={item.name} description={item.description} checks={item.checks}><ButtonDemo /></ComponentWorkbench></div>
}
