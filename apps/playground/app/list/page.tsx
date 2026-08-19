import { ResourceListDemo } from '../../src/demos/list/ResourceListDemo'
import { ComponentWorkbench } from '../../components/ComponentWorkbench'
import { componentCatalog } from '../../src/catalog'

export default function ListPage() {
  const item = componentCatalog[1]
  return <div className="mx-auto w-full max-w-7xl"><ComponentWorkbench title={item.name} description={item.description} checks={item.checks}><ResourceListDemo /></ComponentWorkbench></div>
}
