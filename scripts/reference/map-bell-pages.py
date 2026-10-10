"""Map each audited reference URL to its Celestium adaptation."""
import json,pathlib,collections
inventory=json.load(open('docs/reference/bell-inventory.json'))
def map_page(p):
 if p=='/':return '/','Homepage flight-story structure'
 if p.startswith(('/videos','/video-series')):return '/videos','Aircraft-only reference library; people-focused testimonials excluded'
 if p.startswith('/post/'):
  if any(x in p for x in ['medical','hems','care','call']):return '/journal/an-aircraft-around-care','Original medical-mission research note'
  if any(x in p for x in ['energy','525','electric']):return '/journal/energy-is-a-system','Original aircraft energy research note'
  if any(x in p for x in ['support','maintenance','repair']):return '/journal/maintainability-from-day-one','Original lifecycle research note'
  if any(x in p for x in ['tiltrotor','mv-75','v-22','flraa']):return '/journal/the-tiltrotor-perspective','Original tiltrotor architecture research note'
  return '/journal','Original Celestium journal; Bell news events are not adopted as Celestium history'
 if p.startswith('/events') or p.startswith('/company/events'):return '/company/events','Research conversation page; no invented event attendance'
 if p.startswith('/innovation/hsvtol'):return '/innovation/hsvtol','Dedicated HSVTOL explainer, flight-mode schematic and two aircraft-only clips'
 if p.startswith('/innovation'):return '/innovation','Innovation overview and connected research pages'
 if p.startswith('/products'):
  if p=='/products':return '/products','Filterable study catalogue and architecture comparison'
  if 'literature' in p:return '/products/literature','Actual project research downloads'
  if 'sales-contact' in p:return '/contact','Local research enquiry preparation'
  if 'flight-club' in p:return '/journal','Research notes in place of an invented membership programme'
  if any(x in p for x in ['tiltrotor','mv-75','v-22']):
   if any(x in p for x in ['manufacturing','mosa','sustainment','team','revolutionary-maneuver','nacelle']):return '/innovation/digital-engineering','Connected systems, interfaces and lifecycle research'
   return '/products/tiltrotor','Tiltrotor technology reference and separate Celestium concept context'
  if 'v-247' in p:return '/products/uncrewed','Uncrewed aircraft architecture research without adopting Bell military product claims'
  if any(x in p for x in ['ah-1z','uh-1y','h1','military','viper']):return '/missions/special-missions','Specialised mission-interface research without adopting Bell military product claims'
  if any(x in p for x in ['corporate','designer-series']):return '/missions/business','Regional mobility and cabin requirements perspective'
  if 'energy' in p:return '/missions/energy','Offshore mission requirements perspective'
  if 'adventure' in p:return '/missions/adventure','Remote field-research perspective'
  if 'utility' in p:return '/products/utility','Utility platform and mission interfaces'
  return '/products/commercial','Civil aircraft applications; Bell product names remain Bell references'
 if p.startswith('/missions'):
  if p=='/missions':return '/missions','Nine mission perspectives'
  if 'hems' in p:return ('/mission/cabin' if 'kits' in p else '/mission'),'Dedicated Celestium medical design case'
  if 'business' in p:return '/missions/business','Regional mobility research perspective'
  if 'energy' in p:return '/missions/energy','Offshore and energy mission requirements'
  if 'adventure' in p:return '/missions/adventure','Remote exploration requirements'
  if 'utility' in p:return '/missions/utility','Cargo and utility mission interfaces'
  if 'public-safety' in p:
   if 'starting' in p:return '/missions/public-safety/starting-up','Aviation-unit research planning brief'
   if 'patrol' in p:return '/missions/public-safety/disaster-response','Observation and disaster-response research perspective'
   return '/missions/public-safety','Public-safety mission requirements'
  if 'trainer' in p:return '/missions/training','Training and simulation research requirements'
  return '/missions/special-missions','Specialised mission-interface research'
 if p.startswith('/support'):
  if 'flight-safety' in p:return '/support/flight-safety','Hazards and aircraft-level validation research'
  if 'mybell' in p:return '/support/resources','Open research resources in place of an unsupported customer account portal'
  if 'contact-support' in p:return '/contact','Enquiry preparation without an invented support directory'
  if 'training' in p:
   if 'pilot' in p:return '/support/training/pilot','Pilot knowledge requirements; no approved course claim'
   if 'technical' in p:return '/support/training/technical','Technical knowledge requirements'
   if 'specialty' in p:return '/support/training/mission','Mission-team knowledge requirements'
   return '/support/training','Training research overview; no invented academy facilities'
  if 'protect-and-upgrade' in p:return '/support/upgrades','Interface and configuration-control philosophy'
  if 'maintenance' in p:
   if 'blade' in p:return '/support/maintenance/blades','Rotor and blade research requirements'
   if 'composite' in p:return '/support/maintenance/composites','Structures and inspection research'
   if 'spares' in p:return '/support/maintenance/spares','Replaceable-system philosophy'
   if 'podcast' in p:return '/journal/maintainability-from-day-one','Original maintainability research note'
   return '/support/maintenance','Maintainability research; no invented service centres'
  return '/support','Lifecycle research overview'
 if p.startswith('/company'):
  if 'careers' in p:
   if 'engineering' in p:return '/careers/engineering','Engineering research areas'
   if 'internships' in p:return '/careers/students','Student research enquiry; no internship offer claim'
   if any(x in p for x in ['operations','business']):return '/careers/operations','Mission and documentation contribution areas'
   return '/careers','Research contribution areas; no invented paid vacancies or employment benefits'
  if 'leadership' in p:return '/company/approach','Research approach in place of invented executives'
  if 'responsibility' in p:return '/company/responsibility','Environmental and community research context'
  if 'contact' in p:return '/contact','Local enquiry builder; Bell submission confirmations not duplicated'
  if 'blog' in p or 'insights' in p:return '/journal','Original Celestium research journal'
  if 'certificates' in p:return '/research','Research evidence context; no certification claim'
  return '/company','Celestium story and MALUS research context'
 if p.startswith('/global'):return '/company/partners','Research collaboration context; no invented international operations'
 if p.startswith('/visitors'):return '/company/approach','Research access online; no invented physical visitor facilities'
 if p.startswith('/suppliers'):
  if 'cybersecurity' in p:return '/suppliers/cybersecurity','Technical data stewardship'
  if 'quality' in p:return '/suppliers/quality','Component evidence and traceability'
  if 'terms' in p:return '/suppliers/terms','Collaboration principles, without adopting Bell contracts'
  return '/suppliers','Supplier research interfaces'
 if p.startswith('/legal'):
  if 'privacy' in p or 'cookie' in p:return '/legal/privacy','Actual local-preview data handling'
  return '/legal','Research context and site information; Bell legal entities and contracts not adopted'
 return '/site-directory','Internal component, test or error route reviewed; represented by the public route directory'
result=[]
for item in inventory:
 target,reason=map_page(item['path']);result.append({'reference':item['url'],'referenceTitle':item['title'],'celestium':target,'adaptation':reason,'referenceStatus':item['status']})
pathlib.Path('docs/reference/bell-page-map.json').write_text(json.dumps(result,indent=2))
counts=collections.Counter(x['celestium'] for x in result)
lines=['# Bell reference coverage','',f'All {len(result)} URLs in the public Bell sitemap were retrieved successfully on 8 October 2026. The sitemap includes product pages, mission pages, support pages, company pages, legal notices, individual videos, testimonials, events, forms and internal test pages.','', 'The redesign adapts the page families to Celestium’s actual concept-development context. It does not invent a Bell-sized Celestium fleet, operating service centres, executives, certifications, events, vacancies or past achievements. People-focused video testimonials are represented by the aircraft-only flight library. Bell news and legal notices are not copied into Celestium claims.','', 'Every reference URL has an explicit Celestium destination and adaptation note in `bell-page-map.json`. Public page titles and headings are retained in `bell-inventory.json` as an audit inventory; original HTML was kept only in the temporary reference cache.','', '| Celestium destination | Bell reference URLs |','|---|---:|']
for dest,count in sorted(counts.items()):lines.append(f'| `{dest}` | {count} |')
pathlib.Path('docs/reference/BELL-COVERAGE.md').write_text('\n'.join(lines)+'\n')
print('Mapped',len(result),'reference URLs to',len(counts),'Celestium destinations')
